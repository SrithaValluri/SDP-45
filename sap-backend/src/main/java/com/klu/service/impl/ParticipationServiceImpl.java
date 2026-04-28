package com.klu.service.impl;

import com.klu.dto.ParticipationDto;
import com.klu.entity.Participation;
import com.klu.entity.User;
import com.klu.repository.ParticipationRepository;
import com.klu.repository.UserRepository;
import com.klu.service.EmailService;
import com.klu.service.ParticipationService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ParticipationServiceImpl implements ParticipationService {

    @Autowired
    private ParticipationRepository participationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public ParticipationDto createParticipation(ParticipationDto participationDto) {
        Participation participation = modelMapper.map(participationDto, Participation.class);
        Participation saved = participationRepository.save(participation);

        Optional<User> userOpt = userRepository.findByUsername(saved.getStudentId());
        userOpt.ifPresent(user -> {
            if (user.getEmail() != null && !user.getEmail().isBlank()) {
                String subject = "Participation Submitted - " + saved.getEventName();
                String body = "Dear " + user.getName() + ",\n\n"
                        + "Your participation record has been successfully submitted.\n"
                        + "Event: " + saved.getEventName() + "\n"
                        + "Role: " + saved.getRole() + "\n"
                        + "Status: Pending Review\n\n"
                        + "You will be notified once it is reviewed by the admin.\n\n"
                        + "Regards,\nStudent Achievement Portal";
                emailService.sendEmail(user.getEmail(), subject, body);
            }
        });

        return modelMapper.map(saved, ParticipationDto.class);
    }

    @Override
    public List<ParticipationDto> getAllParticipations() {
        return participationRepository.findAll().stream()
                .map(participation -> modelMapper.map(participation, ParticipationDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<ParticipationDto> getParticipationsByStudentId(String studentId) {
        return participationRepository.findByStudentId(studentId).stream()
                .map(participation -> modelMapper.map(participation, ParticipationDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public ParticipationDto updateParticipationStatus(Long id, String status) {
        Participation participation = participationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Participation not found"));
        participation.setStatus(status);
        Participation saved = participationRepository.save(participation);

        Optional<User> userOpt = userRepository.findByUsername(saved.getStudentId());
        userOpt.ifPresent(user -> {
            if (user.getEmail() != null && !user.getEmail().isBlank()) {
                String subject = "Participation Status Updated - " + saved.getEventName();
                String body = "Dear " + user.getName() + ",\n\n"
                        + "Your participation record has been updated.\n"
                        + "Event: " + saved.getEventName() + "\n"
                        + "Status: " + status + "\n\n"
                        + "Regards,\nStudent Achievement Portal";
                emailService.sendEmail(user.getEmail(), subject, body);
            }
        });

        return modelMapper.map(saved, ParticipationDto.class);
    }
}

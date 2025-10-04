package com.example.backend.repository;

import com.example.backend.entity.HardwareStore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StoreRepository extends JpaRepository<HardwareStore, Long> {
    List<HardwareStore> findByOwnerId(Long ownerId);
    List<HardwareStore> findByCityContainingIgnoreCase(String city);
    Optional<HardwareStore> findByIdAndOwnerId(Long id, Long ownerId);
}
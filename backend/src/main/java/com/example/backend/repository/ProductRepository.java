package com.example.backend.repository;

import com.example.backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByStoreId(Long storeId);
    List<Product> findByStoreOwnerId(Long ownerId);
    List<Product> findByNameContainingIgnoreCase(String name);
    List<Product> findByCategoryContainingIgnoreCase(String category);
    List<Product> findByStoreCityContainingIgnoreCase(String city);
    Optional<Product> findByIdAndStoreOwnerId(Long id, Long ownerId);
}
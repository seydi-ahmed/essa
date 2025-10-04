package com.example.backend.service;

import com.example.backend.entity.HardwareStore;
import com.example.backend.entity.User;
import com.example.backend.exception.ResourceNotFoundException;
import com.example.backend.repository.StoreRepository;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StoreService {
    private final StoreRepository storeRepository;
    private final UserRepository userRepository;

    public HardwareStore createStore(HardwareStore store, Long ownerId) {
        User owner = userRepository.findById(ownerId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + ownerId));
        store.setOwner(owner);
        return storeRepository.save(store);
    }

    public List<HardwareStore> getStoresByOwner(Long ownerId) {
        return storeRepository.findByOwnerId(ownerId);
    }

    public List<HardwareStore> getAllStores() {
        return storeRepository.findAll();
    }

    public HardwareStore getStoreById(Long id) {
        return storeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Store not found with id: " + id));
    }

    public List<HardwareStore> getStoresByCity(String city) {
        return storeRepository.findByCityContainingIgnoreCase(city);
    }

    public HardwareStore updateStore(Long id, HardwareStore storeDetails, Long ownerId) {
        HardwareStore store = storeRepository.findByIdAndOwnerId(id, ownerId)
                .orElseThrow(() -> new ResourceNotFoundException("Store not found with id: " + id + " for owner: " + ownerId));

        store.setName(storeDetails.getName());
        store.setAddress(storeDetails.getAddress());
        store.setCity(storeDetails.getCity());
        store.setPhone(storeDetails.getPhone());
        store.setDescription(storeDetails.getDescription());

        return storeRepository.save(store);
    }

    public void deleteStore(Long id, Long ownerId) {
        HardwareStore store = storeRepository.findByIdAndOwnerId(id, ownerId)
                .orElseThrow(() -> new ResourceNotFoundException("Store not found with id: " + id + " for owner: " + ownerId));
        storeRepository.delete(store);
    }

    public HardwareStore getStoreByIdAndOwner(Long id, Long ownerId) {
        return storeRepository.findByIdAndOwnerId(id, ownerId)
                .orElseThrow(() -> new ResourceNotFoundException("Store not found with id: " + id + " for owner: " + ownerId));
    }
}
package com.example.backend.controller;

import com.example.backend.entity.HardwareStore;
import com.example.backend.service.StoreService;
import com.example.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stores")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class StoreController {
    private final StoreService storeService;
    private final UserService userService;

    @PostMapping
    public ResponseEntity<HardwareStore> createStore(@RequestBody HardwareStore store, 
                                                   @AuthenticationPrincipal UserDetails userDetails) {
        Long ownerId = getUserIdFromUserDetails(userDetails);
        HardwareStore createdStore = storeService.createStore(store, ownerId);
        return ResponseEntity.ok(createdStore);
    }

    @GetMapping("/my-stores")
    public ResponseEntity<List<HardwareStore>> getMyStores(@AuthenticationPrincipal UserDetails userDetails) {
        Long ownerId = getUserIdFromUserDetails(userDetails);
        return ResponseEntity.ok(storeService.getStoresByOwner(ownerId));
    }

    @GetMapping
    public ResponseEntity<List<HardwareStore>> getAllStores() {
        return ResponseEntity.ok(storeService.getAllStores());
    }

    @GetMapping("/{id}")
    public ResponseEntity<HardwareStore> getStoreById(@PathVariable Long id) {
        return ResponseEntity.ok(storeService.getStoreById(id));
    }

    @GetMapping("/city/{city}")
    public ResponseEntity<List<HardwareStore>> getStoresByCity(@PathVariable String city) {
        return ResponseEntity.ok(storeService.getStoresByCity(city));
    }

    @GetMapping("/{id}/with-products")
    public ResponseEntity<HardwareStore> getStoreWithProducts(@PathVariable Long id) {
        HardwareStore store = storeService.getStoreById(id);
        // Charger les produits explicitement si nécessaire
        return ResponseEntity.ok(store);
    }

    @PutMapping("/{id}")
    public ResponseEntity<HardwareStore> updateStore(@PathVariable Long id, 
                                                   @RequestBody HardwareStore store,
                                                   @AuthenticationPrincipal UserDetails userDetails) {
        Long ownerId = getUserIdFromUserDetails(userDetails);
        HardwareStore updatedStore = storeService.updateStore(id, store, ownerId);
        return ResponseEntity.ok(updatedStore);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStore(@PathVariable Long id,
                                          @AuthenticationPrincipal UserDetails userDetails) {
        Long ownerId = getUserIdFromUserDetails(userDetails);
        storeService.deleteStore(id, ownerId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<HardwareStore>> searchStores(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String name) {
        
        if (city != null && !city.isEmpty()) {
            return ResponseEntity.ok(storeService.getStoresByCity(city));
        } else if (name != null && !name.isEmpty()) {
            // Implémentez cette méthode dans StoreService si nécessaire
            return ResponseEntity.ok(storeService.getAllStores());
        } else {
            return ResponseEntity.ok(storeService.getAllStores());
        }
    }

    private Long getUserIdFromUserDetails(UserDetails userDetails) {
        if (userDetails == null) {
            throw new RuntimeException("User not authenticated");
        }
        
        String email = userDetails.getUsername();
        return userService.getUserByEmail(email).getId();
    }
}
package com.example.backend.controller;

import com.example.backend.dto.ProductDto;
import com.example.backend.entity.HardwareStore;
import com.example.backend.service.ProductService;
import com.example.backend.service.StoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/public")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class PublicController {
    
    private final StoreService storeService;
    private final ProductService productService;

    // === MAGASINS PUBLICS ===
    
    @GetMapping("/stores")
    public ResponseEntity<List<HardwareStore>> getAllStoresPublic() {
        return ResponseEntity.ok(storeService.getAllStores());
    }

    @GetMapping("/stores/{id}")
    public ResponseEntity<HardwareStore> getStoreByIdPublic(@PathVariable Long id) {
        return ResponseEntity.ok(storeService.getStoreById(id));
    }

    @GetMapping("/stores/city/{city}")
    public ResponseEntity<List<HardwareStore>> getStoresByCityPublic(@PathVariable String city) {
        return ResponseEntity.ok(storeService.getStoresByCity(city));
    }

    // === PRODUITS PUBLICS ===
    
    @GetMapping("/products")
    public ResponseEntity<List<ProductDto>> getAllProductsPublic() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<ProductDto> getProductByIdPublic(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @GetMapping("/products/store/{storeId}")
    public ResponseEntity<List<ProductDto>> getProductsByStorePublic(@PathVariable Long storeId) {
        return ResponseEntity.ok(productService.getProductsByStore(storeId));
    }

    @GetMapping("/products/search/name/{name}")
    public ResponseEntity<List<ProductDto>> searchProductsByNamePublic(@PathVariable String name) {
        return ResponseEntity.ok(productService.searchProductsByName(name));
    }

    @GetMapping("/products/search/category/{category}")
    public ResponseEntity<List<ProductDto>> searchProductsByCategoryPublic(@PathVariable String category) {
        return ResponseEntity.ok(productService.searchProductsByCategory(category));
    }

    @GetMapping("/products/city/{city}")
    public ResponseEntity<List<ProductDto>> getProductsByCityPublic(@PathVariable String city) {
        return ResponseEntity.ok(productService.getProductsByCity(city));
    }
}
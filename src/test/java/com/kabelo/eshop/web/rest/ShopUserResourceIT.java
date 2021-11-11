package com.kabelo.eshop.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.kabelo.eshop.IntegrationTest;
import com.kabelo.eshop.domain.ShopUser;
import com.kabelo.eshop.domain.enumeration.Role;
import com.kabelo.eshop.repository.ShopUserRepository;
import com.kabelo.eshop.service.dto.ShopUserDTO;
import com.kabelo.eshop.service.mapper.ShopUserMapper;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link ShopUserResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ShopUserResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_PASSWORD = "AAAAAAAAAA";
    private static final String UPDATED_PASSWORD = "BBBBBBBBBB";

    private static final Role DEFAULT_ROLE = Role.USER;
    private static final Role UPDATED_ROLE = Role.ADMIN;

    private static final String ENTITY_API_URL = "/api/shop-users";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ShopUserRepository shopUserRepository;

    @Autowired
    private ShopUserMapper shopUserMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restShopUserMockMvc;

    private ShopUser shopUser;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ShopUser createEntity(EntityManager em) {
        ShopUser shopUser = new ShopUser().name(DEFAULT_NAME).email(DEFAULT_EMAIL).password(DEFAULT_PASSWORD).role(DEFAULT_ROLE);
        return shopUser;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ShopUser createUpdatedEntity(EntityManager em) {
        ShopUser shopUser = new ShopUser().name(UPDATED_NAME).email(UPDATED_EMAIL).password(UPDATED_PASSWORD).role(UPDATED_ROLE);
        return shopUser;
    }

    @BeforeEach
    public void initTest() {
        shopUser = createEntity(em);
    }

    @Test
    @Transactional
    void createShopUser() throws Exception {
        int databaseSizeBeforeCreate = shopUserRepository.findAll().size();
        // Create the ShopUser
        ShopUserDTO shopUserDTO = shopUserMapper.toDto(shopUser);
        restShopUserMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(shopUserDTO)))
            .andExpect(status().isCreated());

        // Validate the ShopUser in the database
        List<ShopUser> shopUserList = shopUserRepository.findAll();
        assertThat(shopUserList).hasSize(databaseSizeBeforeCreate + 1);
        ShopUser testShopUser = shopUserList.get(shopUserList.size() - 1);
        assertThat(testShopUser.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testShopUser.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testShopUser.getPassword()).isEqualTo(DEFAULT_PASSWORD);
        assertThat(testShopUser.getRole()).isEqualTo(DEFAULT_ROLE);
    }

    @Test
    @Transactional
    void createShopUserWithExistingId() throws Exception {
        // Create the ShopUser with an existing ID
        shopUser.setId(1L);
        ShopUserDTO shopUserDTO = shopUserMapper.toDto(shopUser);

        int databaseSizeBeforeCreate = shopUserRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restShopUserMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(shopUserDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ShopUser in the database
        List<ShopUser> shopUserList = shopUserRepository.findAll();
        assertThat(shopUserList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllShopUsers() throws Exception {
        // Initialize the database
        shopUserRepository.saveAndFlush(shopUser);

        // Get all the shopUserList
        restShopUserMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(shopUser.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)))
            .andExpect(jsonPath("$.[*].password").value(hasItem(DEFAULT_PASSWORD)))
            .andExpect(jsonPath("$.[*].role").value(hasItem(DEFAULT_ROLE.toString())));
    }

    @Test
    @Transactional
    void getShopUser() throws Exception {
        // Initialize the database
        shopUserRepository.saveAndFlush(shopUser);

        // Get the shopUser
        restShopUserMockMvc
            .perform(get(ENTITY_API_URL_ID, shopUser.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(shopUser.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL))
            .andExpect(jsonPath("$.password").value(DEFAULT_PASSWORD))
            .andExpect(jsonPath("$.role").value(DEFAULT_ROLE.toString()));
    }

    @Test
    @Transactional
    void getNonExistingShopUser() throws Exception {
        // Get the shopUser
        restShopUserMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewShopUser() throws Exception {
        // Initialize the database
        shopUserRepository.saveAndFlush(shopUser);

        int databaseSizeBeforeUpdate = shopUserRepository.findAll().size();

        // Update the shopUser
        ShopUser updatedShopUser = shopUserRepository.findById(shopUser.getId()).get();
        // Disconnect from session so that the updates on updatedShopUser are not directly saved in db
        em.detach(updatedShopUser);
        updatedShopUser.name(UPDATED_NAME).email(UPDATED_EMAIL).password(UPDATED_PASSWORD).role(UPDATED_ROLE);
        ShopUserDTO shopUserDTO = shopUserMapper.toDto(updatedShopUser);

        restShopUserMockMvc
            .perform(
                put(ENTITY_API_URL_ID, shopUserDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(shopUserDTO))
            )
            .andExpect(status().isOk());

        // Validate the ShopUser in the database
        List<ShopUser> shopUserList = shopUserRepository.findAll();
        assertThat(shopUserList).hasSize(databaseSizeBeforeUpdate);
        ShopUser testShopUser = shopUserList.get(shopUserList.size() - 1);
        assertThat(testShopUser.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testShopUser.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testShopUser.getPassword()).isEqualTo(UPDATED_PASSWORD);
        assertThat(testShopUser.getRole()).isEqualTo(UPDATED_ROLE);
    }

    @Test
    @Transactional
    void putNonExistingShopUser() throws Exception {
        int databaseSizeBeforeUpdate = shopUserRepository.findAll().size();
        shopUser.setId(count.incrementAndGet());

        // Create the ShopUser
        ShopUserDTO shopUserDTO = shopUserMapper.toDto(shopUser);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restShopUserMockMvc
            .perform(
                put(ENTITY_API_URL_ID, shopUserDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(shopUserDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ShopUser in the database
        List<ShopUser> shopUserList = shopUserRepository.findAll();
        assertThat(shopUserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchShopUser() throws Exception {
        int databaseSizeBeforeUpdate = shopUserRepository.findAll().size();
        shopUser.setId(count.incrementAndGet());

        // Create the ShopUser
        ShopUserDTO shopUserDTO = shopUserMapper.toDto(shopUser);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restShopUserMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(shopUserDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ShopUser in the database
        List<ShopUser> shopUserList = shopUserRepository.findAll();
        assertThat(shopUserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamShopUser() throws Exception {
        int databaseSizeBeforeUpdate = shopUserRepository.findAll().size();
        shopUser.setId(count.incrementAndGet());

        // Create the ShopUser
        ShopUserDTO shopUserDTO = shopUserMapper.toDto(shopUser);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restShopUserMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(shopUserDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the ShopUser in the database
        List<ShopUser> shopUserList = shopUserRepository.findAll();
        assertThat(shopUserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateShopUserWithPatch() throws Exception {
        // Initialize the database
        shopUserRepository.saveAndFlush(shopUser);

        int databaseSizeBeforeUpdate = shopUserRepository.findAll().size();

        // Update the shopUser using partial update
        ShopUser partialUpdatedShopUser = new ShopUser();
        partialUpdatedShopUser.setId(shopUser.getId());

        partialUpdatedShopUser.name(UPDATED_NAME).password(UPDATED_PASSWORD).role(UPDATED_ROLE);

        restShopUserMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedShopUser.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedShopUser))
            )
            .andExpect(status().isOk());

        // Validate the ShopUser in the database
        List<ShopUser> shopUserList = shopUserRepository.findAll();
        assertThat(shopUserList).hasSize(databaseSizeBeforeUpdate);
        ShopUser testShopUser = shopUserList.get(shopUserList.size() - 1);
        assertThat(testShopUser.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testShopUser.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testShopUser.getPassword()).isEqualTo(UPDATED_PASSWORD);
        assertThat(testShopUser.getRole()).isEqualTo(UPDATED_ROLE);
    }

    @Test
    @Transactional
    void fullUpdateShopUserWithPatch() throws Exception {
        // Initialize the database
        shopUserRepository.saveAndFlush(shopUser);

        int databaseSizeBeforeUpdate = shopUserRepository.findAll().size();

        // Update the shopUser using partial update
        ShopUser partialUpdatedShopUser = new ShopUser();
        partialUpdatedShopUser.setId(shopUser.getId());

        partialUpdatedShopUser.name(UPDATED_NAME).email(UPDATED_EMAIL).password(UPDATED_PASSWORD).role(UPDATED_ROLE);

        restShopUserMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedShopUser.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedShopUser))
            )
            .andExpect(status().isOk());

        // Validate the ShopUser in the database
        List<ShopUser> shopUserList = shopUserRepository.findAll();
        assertThat(shopUserList).hasSize(databaseSizeBeforeUpdate);
        ShopUser testShopUser = shopUserList.get(shopUserList.size() - 1);
        assertThat(testShopUser.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testShopUser.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testShopUser.getPassword()).isEqualTo(UPDATED_PASSWORD);
        assertThat(testShopUser.getRole()).isEqualTo(UPDATED_ROLE);
    }

    @Test
    @Transactional
    void patchNonExistingShopUser() throws Exception {
        int databaseSizeBeforeUpdate = shopUserRepository.findAll().size();
        shopUser.setId(count.incrementAndGet());

        // Create the ShopUser
        ShopUserDTO shopUserDTO = shopUserMapper.toDto(shopUser);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restShopUserMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, shopUserDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(shopUserDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ShopUser in the database
        List<ShopUser> shopUserList = shopUserRepository.findAll();
        assertThat(shopUserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchShopUser() throws Exception {
        int databaseSizeBeforeUpdate = shopUserRepository.findAll().size();
        shopUser.setId(count.incrementAndGet());

        // Create the ShopUser
        ShopUserDTO shopUserDTO = shopUserMapper.toDto(shopUser);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restShopUserMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(shopUserDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the ShopUser in the database
        List<ShopUser> shopUserList = shopUserRepository.findAll();
        assertThat(shopUserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamShopUser() throws Exception {
        int databaseSizeBeforeUpdate = shopUserRepository.findAll().size();
        shopUser.setId(count.incrementAndGet());

        // Create the ShopUser
        ShopUserDTO shopUserDTO = shopUserMapper.toDto(shopUser);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restShopUserMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(shopUserDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ShopUser in the database
        List<ShopUser> shopUserList = shopUserRepository.findAll();
        assertThat(shopUserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteShopUser() throws Exception {
        // Initialize the database
        shopUserRepository.saveAndFlush(shopUser);

        int databaseSizeBeforeDelete = shopUserRepository.findAll().size();

        // Delete the shopUser
        restShopUserMockMvc
            .perform(delete(ENTITY_API_URL_ID, shopUser.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ShopUser> shopUserList = shopUserRepository.findAll();
        assertThat(shopUserList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

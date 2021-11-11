package com.kabelo.eshop.service.dto;

import com.kabelo.eshop.domain.enumeration.Role;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.kabelo.eshop.domain.ShopUser} entity.
 */
public class ShopUserDTO implements Serializable {

    private Long id;

    private String name;

    private String email;

    private String password;

    private Role role;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ShopUserDTO)) {
            return false;
        }

        ShopUserDTO shopUserDTO = (ShopUserDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, shopUserDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ShopUserDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", email='" + getEmail() + "'" +
            ", password='" + getPassword() + "'" +
            ", role='" + getRole() + "'" +
            "}";
    }
}

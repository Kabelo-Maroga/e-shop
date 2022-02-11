package com.kabelo.eshop.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.kabelo.eshop.domain.enumeration.Role;
import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A ShopUser.
 */
@Entity
@Table(name = "shop_user")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ShopUser implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private Role role;

    @JsonIgnoreProperties(value = { "shopUser", "product" }, allowSetters = true)
    @OneToOne(mappedBy = "shopUser")
    private ShoppingCart shoppingCart;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public ShopUser id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public ShopUser name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return this.email;
    }

    public ShopUser email(String email) {
        this.setEmail(email);
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return this.password;
    }

    public ShopUser password(String password) {
        this.setPassword(password);
        return this;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return this.role;
    }

    public ShopUser role(Role role) {
        this.setRole(role);
        return this;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public ShoppingCart getShoppingCart() {
        return this.shoppingCart;
    }

    public void setShoppingCart(ShoppingCart shoppingCart) {
        if (this.shoppingCart != null) {
            this.shoppingCart.setShopUser(null);
        }
        if (shoppingCart != null) {
            shoppingCart.setShopUser(this);
        }
        this.shoppingCart = shoppingCart;
    }

    public ShopUser shoppingCart(ShoppingCart shoppingCart) {
        this.setShoppingCart(shoppingCart);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ShopUser)) {
            return false;
        }
        return id != null && id.equals(((ShopUser) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ShopUser{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", email='" + getEmail() + "'" +
            ", password='" + getPassword() + "'" +
            ", role='" + getRole() + "'" +
            "}";
    }
}

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,

    tenant_id INT NOT NULL,
    department_id INT NOT NULL,
    role_id INT NOT NULL,

    employee_id VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,

    status ENUM('ACTIVE','INACTIVE','SUSPENDED')
    DEFAULT 'ACTIVE',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_user_tenant
        FOREIGN KEY (tenant_id)
        REFERENCES tenants(id),

    CONSTRAINT fk_user_department
        FOREIGN KEY (department_id)
        REFERENCES departments(id),

    CONSTRAINT fk_user_role
        FOREIGN KEY (role_id)
        REFERENCES roles(id),

    CONSTRAINT uq_employee_per_tenant
        UNIQUE (tenant_id, employee_id),

    CONSTRAINT uq_email_per_tenant
        UNIQUE (tenant_id, email)
);
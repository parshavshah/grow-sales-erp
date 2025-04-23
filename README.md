## ✅ Overview

This project is a large, modular ERP + CRM system built entirely with CRUD operations. Designed to be sold on marketplaces like CodeCanyon, it avoids complex automations or integrations, focusing instead on usability, clean code, and scalability.

---

# ERP + CRM System (CRUD-Based)

## 📁 Module List (Features)

### ⚙️ Admin / System Settings

- Roles & Permissions
- Users
- System Settings
- Custom Fields

### 🧑‍💼 CRM

- Leads Management
- Contacts Management
- Accounts/Customers
- Follow-ups
- Notes

### 🧾 Sales

- Quotations
- Sales Orders
- Invoices
- Products & Services
- Pricing

### 🧾 Finance

- Income & Expense Tracking
- Payments & Receipts

### 📋 Projects & Tasks

- Projects
- Tasks
- Task Comments
- Time Tracking

### 📊 Reports (CRUD Tables)

- Sales Reports
- Purchase Reports
- Inventory Reports
- Financial Reports
- Attendance/Leave Reports

# Database Schema for ERP + CRM System

I'll design a comprehensive database schema for your NodeJS and MySQL-based ERP + CRM system. This schema supports all the modules you've outlined while maintaining scalability and clean design.

## Core Tables

### `users`

| Column       | Type         | Constraints                | Description                    |
| ------------ | ------------ | -------------------------- | ------------------------------ |
| id           | INT          | PRIMARY KEY, AUTOINCREMENT | Unique user identifier         |
| username     | VARCHAR(255) | UNIQUE, NOT NULL           | Login username                 |
| email        | VARCHAR(255) | UNIQUE, NOT NULL           | User email address             |
| passwordHash | VARCHAR(255) | NOT NULL                   | Hashed password                |
| firstName    | VARCHAR(255) | NOT NULL                   | User's first name              |
| lastName     | VARCHAR(255) | NOT NULL                   | User's last name               |
| phone        | VARCHAR(255) |                            | User's phone number            |
| profileImage | VARCHAR(255) |                            | Path to profile image          |
| status       | BOOLEAN      | DEFAULT TRUE               | Whether user account is active |
| lastLogin    | TIMESTAMP    |                            | Last login timestamp           |

### `roles`

| Column      | Type         | Constraints                | Description                      |
| ----------- | ------------ | -------------------------- | -------------------------------- |
| id          | INT          | PRIMARY KEY, AUTOINCREMENT | Unique role identifier           |
| name        | VARCHAR(255) | UNIQUE, NOT NULL           | Role name (Admin, Manager, etc.) |
| description | TEXT         |                            | Role description                 |

### `userroles`

| Column | Type | Constraints                      | Description               |
| ------ | ---- | -------------------------------- | ------------------------- |
| id     | INT  | PRIMARY KEY, AUTOINCREMENT       | Unique mapping identifier |
| userId | INT  | FOREIGN KEY (users.id), NOT NULL | References user           |
| roleId | INT  | FOREIGN KEY (roles.id), NOT NULL | References role           |

### `permissions`

| Column      | Type         | Constraints                | Description                             |
| ----------- | ------------ | -------------------------- | --------------------------------------- |
| id          | INT          | PRIMARY KEY, AUTOINCREMENT | Unique permission identifier            |
| name        | VARCHAR(255) | UNIQUE, NOT NULL           | Permission name                         |
| code        | VARCHAR(255) | UNIQUE, NOT NULL           | Permission code (e.g., 'createInvoice') |
| module      | VARCHAR(255) | NOT NULL                   | Related module (e.g., 'sales', 'crm')   |
| description | TEXT         |                            | Permission description                  |

### `rolepermissions`

| Column       | Type | Constraints                            | Description               |
| ------------ | ---- | -------------------------------------- | ------------------------- |
| id           | INT  | PRIMARY KEY, AUTOINCREMENT             | Unique mapping identifier |
| roleId       | INT  | FOREIGN KEY (roles.id), NOT NULL       | References role           |
| permissionId | INT  | FOREIGN KEY (permissions.id), NOT NULL | References permission     |

### `systemsettings`

| Column       | Type         | Constraints                | Description                                      |
| ------------ | ------------ | -------------------------- | ------------------------------------------------ |
| id           | INT          | PRIMARY KEY, AUTOINCREMENT | Unique setting identifier                        |
| settingKey   | VARCHAR(255) | UNIQUE, NOT NULL           | Setting key                                      |
| settingValue | TEXT         |                            | Setting value                                    |
| settingGroup | VARCHAR(255) | NOT NULL                   | Group for organization (e.g., 'general', 'mail') |
| description  | TEXT         |                            | Description of the setting                       |

### `customfields`

| Column       | Type         | Constraints                | Description                                              |
| ------------ | ------------ | -------------------------- | -------------------------------------------------------- |
| id           | INT          | PRIMARY KEY, AUTOINCREMENT | Unique field identifier                                  |
| entityType   | VARCHAR(255) | NOT NULL                   | Entity this field belongs to (e.g., 'leads', 'contacts') |
| fieldName    | VARCHAR(255) | NOT NULL                   | Name of the custom field                                 |
| fieldLabel   | VARCHAR(255) | NOT NULL                   | Display label for the field                              |
| fieldType    | VARCHAR(255) | NOT NULL                   | Type of field (text, number, date, etc.)                 |
| fieldOptions | TEXT         |                            | JSON string of options for dropdown/multi-select fields  |
| isRequired   | BOOLEAN      | DEFAULT FALSE              | Whether field is required                                |
| fieldOrder   | INT          | DEFAULT 0                  | Display order                                            |
| status       | BOOLEAN      | DEFAULT TRUE               | Whether field is active                                  |

### `customfieldvalues`

| Column        | Type | Constraints                             | Description                                         |
| ------------- | ---- | --------------------------------------- | --------------------------------------------------- |
| id            | INT  | PRIMARY KEY, AUTOINCREMENT              | Unique value identifier                             |
| customFieldId | INT  | FOREIGN KEY (customFields.id), NOT NULL | References custom field                             |
| entityId      | INT  | NOT NULL                                | ID of the entity instance (e.g., leadId, contactId) |
| value         | TEXT |                                         | Value of the custom field                           |

## CRM Module

### `leads`

| Column       | Type         | Constraints                      | Description                              |
| ------------ | ------------ | -------------------------------- | ---------------------------------------- |
| id           | INT          | PRIMARY KEY, AUTOINCREMENT       | Unique lead identifier                   |
| firstName    | VARCHAR(255) | NOT NULL                         | Lead's first name                        |
| lastName     | VARCHAR(255) | NOT NULL                         | Lead's last name                         |
| email        | VARCHAR(255) |                                  | Lead's email                             |
| phone        | VARCHAR(255) |                                  | Lead's phone number                      |
| company      | VARCHAR(255) |                                  | Company name                             |
| job_title    | VARCHAR(255) |                                  | Lead's job title                         |
| lead_source  | VARCHAR(255) |                                  | Source of the lead                       |
| leadStatus   | VARCHAR(255) | NOT NULL                         | Status (New, Contacted, Qualified, etc.) |
| industry     | VARCHAR(255) |                                  | Industry sector                          |
| address      | TEXT         |                                  | Address                                  |
| city         | VARCHAR(255) |                                  | City                                     |
| state        | VARCHAR(255) |                                  | State/Province                           |
| zip          | VARCHAR(255) |                                  | ZIP/Postal code                          |
| country      | VARCHAR(255) |                                  | Country                                  |
| description  | TEXT         |                                  | Additional notes                         |
| assignedTo   | INT          | FOREIGN KEY (users.id)           | User responsible for this lead           |
| createdBy    | INT          | FOREIGN KEY (users.id), NOT NULL | User who created this lead               |
| lastActivity | TIMESTAMP    |                                  | Last activity date                       |

### `contacts`

| Column     | Type         | Constraints                      | Description                       |
| ---------- | ------------ | -------------------------------- | --------------------------------- |
| id         | INT          | PRIMARY KEY, AUTOINCREMENT       | Unique contact identifier         |
| accountId  | INT          | FOREIGN KEY (accounts.id)        | Associated account/customer       |
| firstName  | VARCHAR(255) | NOT NULL                         | Contact's first name              |
| lastName   | VARCHAR(255) | NOT NULL                         | Contact's last name               |
| email      | VARCHAR(255) |                                  | Contact's email                   |
| phone      | VARCHAR(255) |                                  | Contact's phone number            |
| mobile     | VARCHAR(255) |                                  | Contact's mobile number           |
| jobTitle   | VARCHAR(255) |                                  | Contact's job title               |
| department | VARCHAR(255) |                                  | Department                        |
| address    | TEXT         |                                  | Address                           |
| city       | VARCHAR(255) |                                  | City                              |
| state      | VARCHAR(255) |                                  | State/Province                    |
| zip        | VARCHAR(255) |                                  | ZIP/Postal code                   |
| country    | VARCHAR(255) |                                  | Country                           |
| assignedTo | INT          | FOREIGN KEY (users.id)           | User responsible for this contact |
| createdBy  | INT          | FOREIGN KEY (users.id), NOT NULL | User who created this contact     |

### `accounts`

| Column      | Type         | Constraints                      | Description                       |
| ----------- | ------------ | -------------------------------- | --------------------------------- |
| id          | INT          | PRIMARY KEY, AUTOINCREMENT       | Unique account identifier         |
| name        | VARCHAR(255) | NOT NULL                         | Account/company name              |
| accountType | VARCHAR(255) |                                  | Type (Customer, Partner, etc.)    |
| website     | VARCHAR(255) |                                  | Company website                   |
| industry    | VARCHAR(255) |                                  | Industry sector                   |
| phone       | VARCHAR(255) |                                  | Main phone number                 |
| address     | TEXT         |                                  | Address                           |
| city        | VARCHAR(255) |                                  | City                              |
| state       | VARCHAR(255) |                                  | State/Province                    |
| zip         | VARCHAR(255) |                                  | ZIP/Postal code                   |
| country     | VARCHAR(255) |                                  | Country                           |
| description | TEXT         |                                  | Additional notes                  |
| assignedTo  | INT          | FOREIGN KEY (users.id)           | User responsible for this account |
| createdBy   | INT          | FOREIGN KEY (users.id), NOT NULL | User who created this account     |

### `followups`

| Column       | Type         | Constraints                      | Description                            |
| ------------ | ------------ | -------------------------------- | -------------------------------------- |
| id           | INT          | PRIMARY KEY, AUTOINCREMENT       | Unique follow-up identifier            |
| entityType   | VARCHAR(255) | NOT NULL                         | Entity type (lead, contact, account)   |
| entityId     | INT          | NOT NULL                         | ID of the entity                       |
| followUpType | VARCHAR(255) | NOT NULL                         | Type (Call, Email, Meeting, etc.)      |
| subject      | VARCHAR(255) | NOT NULL                         | Subject of follow-up                   |
| description  | TEXT         |                                  | Details                                |
| dueDate      | DATETIME     | NOT NULL                         | When follow-up is due                  |
| status       | VARCHAR(255) | NOT NULL, DEFAULT 'Pending'      | Status (Pending, Completed, Cancelled) |
| outcome      | TEXT         |                                  | Result of the follow-up                |
| assignedTo   | INT          | FOREIGN KEY (users.id), NOT NULL | User responsible                       |
| createdBy    | INT          | FOREIGN KEY (users.id), NOT NULL | User who created this follow-up        |
| completedAt  | TIMESTAMP    |                                  | When follow-up was completed           |
| isResolved   | BOOLEAN      |                                  | is followup completed or not           |

### `notes`

| Column      | Type         | Constraints                      | Description                                |
| ----------- | ------------ | -------------------------------- | ------------------------------------------ |
| id          | INT          | PRIMARY KEY, AUTOINCREMENT       | Unique note identifier                     |
| entityType  | VARCHAR(255) | NOT NULL                         | Entity type (lead, contact, account, etc.) |
| entityId    | INT          | NOT NULL                         | ID of the entity                           |
| title       | VARCHAR(255) |                                  | Note title                                 |
| description | TEXT         | NOT NULL                         | Note content                               |
| createdBy   | INT          | FOREIGN KEY (users.id), NOT NULL | User who created this note                 |

## Sales Module

### `taxes`

| Column | Type         | Constraints                         | Description                                   |
| ------ | ------------ | ----------------------------------- | --------------------------------------------- |
| id     | INT          | PRIMARY KEY, AUTOINCREMENT          | Unique category identifier                    |
| name   | VARCHAR(255) | NOT NULL                            | Category name                                 |
| value  | FLOAT        |                                     | Category description                          |
| type   | VARCHAR(255) | FOREIGN KEY (product_categories.id) | Parent category ID for hierarchical structure |

### `products`

| Column      | Type          | Constraints                      | Description                   |
| ----------- | ------------- | -------------------------------- | ----------------------------- |
| id          | INT           | PRIMARY KEY, AUTOINCREMENT       | Unique product identifier     |
| name        | VARCHAR(255)  | NOT NULL                         | Product name                  |
| sku         | VARCHAR(255)  | UNIQUE                           | Stock keeping unit            |
| description | TEXT          |                                  | Product description           |
| type        | VARCHAR(255)  | DEFAULT 'Product'                | Type (Product, Service)       |
| unit        | VARCHAR(255)  |                                  | Unit of measurement           |
| price       | DECIMAL(15,2) | NOT NULL                         | Standard price                |
| cost        | DECIMAL(15,2) |                                  | Cost price                    |
| status      | BOOLEAN       | DEFAULT TRUE                     | Whether product is active     |
| image       | VARCHAR(255)  |                                  | Path to product image         |
| createdBy   | INT           | FOREIGN KEY (users.id), NOT NULL | User who created this product |

### `producttaxes`

| Column    | Type | Constraints                | Description                |
| --------- | ---- | -------------------------- | -------------------------- |
| id        | INT  | PRIMARY KEY, AUTOINCREMENT | Unique category identifier |
| productId | INT  | NOT NULL                   | Category name              |
| taxId     | INT  |                            | Category description       |

### `quotations`

| Column          | Type          | Constraints                         | Description                          |
| --------------- | ------------- | ----------------------------------- | ------------------------------------ |
| id              | INT           | PRIMARY KEY, AUTOINCREMENT          | Unique quotation identifier          |
| quotationNumber | VARCHAR(255)  | UNIQUE, NOT NULL                    | Quotation number                     |
| accountId       | INT           | FOREIGN KEY (accounts.id), NOT NULL | Customer/account                     |
| contactId       | INT           | FOREIGN KEY (contacts.id)           | Primary contact                      |
| quoteDate       | DATE          | NOT NULL                            | Date of quotation                    |
| expiryDate      | DATE          | NOT NULL                            | Expiry date                          |
| status          | VARCHAR(255)  | NOT NULL                            | Status (Draft, Sent, Accepted, etc.) |
| currency        | VARCHAR(3)    | DEFAULT 'USD'                       | Currency code                        |
| taxInclusive    | BOOLEAN       | DEFAULT FALSE                       | Whether prices include tax           |
| subtotal        | DECIMAL(15,2) | NOT NULL                            | Sum of line items                    |
| taxAmount       | DECIMAL(15,2) | DEFAULT 0                           | Total tax amount                     |
| discountType    | VARCHAR(255)  |                                     | Discount type (percentage, fixed)    |
| discountValue   | DECIMAL(15,2) | DEFAULT 0                           | Discount value                       |
| totalAmount     | DECIMAL(15,2) | NOT NULL                            | Final total amount                   |
| notes           | TEXT          |                                     | Additional notes                     |
| terms           | TEXT          |                                     | Terms and conditions                 |
| assignedTo      | INT           | FOREIGN KEY (users.id)              | User responsible                     |
| createdBy       | INT           | FOREIGN KEY (users.id), NOT NULL    | User who created this quotation      |

### `quotationitems`

| Column        | Type          | Constraints                           | Description                       |
| ------------- | ------------- | ------------------------------------- | --------------------------------- |
| id            | INT           | PRIMARY KEY, AUTOINCREMENT            | Unique item identifier            |
| quotationId   | INT           | FOREIGN KEY (quotations.id), NOT NULL | References quotation              |
| productId     | INT           | FOREIGN KEY (products.id)             | References product                |
| description   | TEXT          | NOT NULL                              | Item description                  |
| quantity      | DECIMAL(10,2) | NOT NULL                              | Quantity                          |
| unitPrice     | DECIMAL(15,2) | NOT NULL                              | Unit price                        |
| taxRate       | DECIMAL(5,2)  | DEFAULT 0                             | Tax rate for this item            |
| taxAmount     | DECIMAL(15,2) | DEFAULT 0                             | Tax amount                        |
| discountType  | VARCHAR(255)  |                                       | Discount type (percentage, fixed) |
| discountValue | DECIMAL(15,2) | DEFAULT 0                             | Discount value                    |
| totalAmount   | DECIMAL(15,2) | NOT NULL                              | Line total amount                 |

### `salesorders`

| Column               | Type          | Constraints                         | Description                               |
| -------------------- | ------------- | ----------------------------------- | ----------------------------------------- |
| id                   | INT           | PRIMARY KEY, AUTOINCREMENT          | Unique order identifier                   |
| orderNumber          | VARCHAR(255)  | UNIQUE, NOT NULL                    | Sales order number                        |
| quotationId          | INT           | FOREIGN KEY (quotations.id)         | Related quotation                         |
| accountId            | INT           | FOREIGN KEY (accounts.id), NOT NULL | Customer/account                          |
| contactId            | INT           | FOREIGN KEY (contacts.id)           | Primary contact                           |
| orderDate            | DATE          | NOT NULL                            | Date of order                             |
| expectedDeliveryDate | DATE          |                                     | Expected delivery date                    |
| status               | VARCHAR(255)  | NOT NULL                            | Status (New, Processing, Completed, etc.) |
| currency             | VARCHAR(3)    | DEFAULT 'USD'                       | Currency code                             |
| taxInclusive         | BOOLEAN       | DEFAULT FALSE                       | Whether prices include tax                |
| subtotal             | DECIMAL(15,2) | NOT NULL                            | Sum of line items                         |
| taxAmount            | DECIMAL(15,2) | DEFAULT 0                           | Total tax amount                          |
| discountType         | VARCHAR(255)  |                                     | Discount type (percentage, fixed)         |
| discountValue        | DECIMAL(15,2) | DEFAULT 0                           | Discount value                            |
| totalAmount          | DECIMAL(15,2) | NOT NULL                            | Final total amount                        |
| notes                | TEXT          |                                     | Additional notes                          |
| terms                | TEXT          |                                     | Terms and conditions                      |
| assignedTo           | INT           | FOREIGN KEY (users.id)              | User responsible                          |
| createdBy            | INT           | FOREIGN KEY (users.id), NOT NULL    | User who created this order               |

### `salesorderitems`

| Column        | Type          | Constraints                            | Description                       |
| ------------- | ------------- | -------------------------------------- | --------------------------------- |
| id            | INT           | PRIMARY KEY, AUTOINCREMENT             | Unique item identifier            |
| salesOrderId  | INT           | FOREIGN KEY (salesOrders.id), NOT NULL | References sales order            |
| productId     | INT           | FOREIGN KEY (products.id)              | References product                |
| description   | TEXT          | NOT NULL                               | Item description                  |
| quantity      | DECIMAL(10,2) | NOT NULL                               | Quantity                          |
| unitPrice     | DECIMAL(15,2) | NOT NULL                               | Unit price                        |
| taxRate       | DECIMAL(5,2)  | DEFAULT 0                              | Tax rate for this item            |
| taxAmount     | DECIMAL(15,2) | DEFAULT 0                              | Tax amount                        |
| discountType  | VARCHAR(255)  |                                        | Discount type (percentage, fixed) |
| discountValue | DECIMAL(15,2) | DEFAULT 0                              | Discount value                    |
| totalAmount   | DECIMAL(15,2) | NOT NULL                               | Line total amount                 |

### `invoices`

| Column        | Type          | Constraints                         | Description                               |
| ------------- | ------------- | ----------------------------------- | ----------------------------------------- |
| id            | INT           | PRIMARY KEY, AUTOINCREMENT          | Unique invoice identifier                 |
| invoiceNumber | VARCHAR(255)  | UNIQUE, NOT NULL                    | Invoice number                            |
| salesOrderId  | INT           | FOREIGN KEY (salesOrders.id)        | Related sales order                       |
| accountId     | INT           | FOREIGN KEY (accounts.id), NOT NULL | Customer/account                          |
| contactId     | INT           | FOREIGN KEY (contacts.id)           | Primary contact                           |
| invoiceDate   | DATE          | NOT NULL                            | Date of invoice                           |
| dueDate       | DATE          | NOT NULL                            | Payment due date                          |
| status        | VARCHAR(255)  | NOT NULL                            | Status (Draft, Sent, Paid, Overdue, etc.) |
| currency      | VARCHAR(3)    | DEFAULT 'USD'                       | Currency code                             |
| taxInclusive  | BOOLEAN       | DEFAULT FALSE                       | Whether prices include tax                |
| subtotal      | DECIMAL(15,2) | NOT NULL                            | Sum of line items                         |
| taxAmount     | DECIMAL(15,2) | DEFAULT 0                           | Total tax amount                          |
| discountType  | VARCHAR(255)  |                                     | Discount type (percentage, fixed)         |
| discountValue | DECIMAL(15,2) | DEFAULT 0                           | Discount value                            |
| totalAmount   | DECIMAL(15,2) | NOT NULL                            | Final total amount                        |
| amountPaid    | DECIMAL(15,2) | DEFAULT 0                           | Amount paid so far                        |
| amountDue     | DECIMAL(15,2) | NOT NULL                            | Amount still due                          |
| notes         | TEXT          |                                     | Additional notes                          |
| terms         | TEXT          |                                     | Terms and conditions                      |
| assignedTo    | INT           | FOREIGN KEY (users.id)              | User responsible                          |
| createdBy     | INT           | FOREIGN KEY (users.id), NOT NULL    | User who created this invoice             |

### `invoiceitems`

| Column        | Type          | Constraints                         | Description                       |
| ------------- | ------------- | ----------------------------------- | --------------------------------- |
| id            | INT           | PRIMARY KEY, AUTOINCREMENT          | Unique item identifier            |
| invoiceId     | INT           | FOREIGN KEY (invoices.id), NOT NULL | References invoice                |
| productId     | INT           | FOREIGN KEY (products.id)           | References product                |
| description   | TEXT          | NOT NULL                            | Item description                  |
| quantity      | DECIMAL(10,2) | NOT NULL                            | Quantity                          |
| unitPrice     | DECIMAL(15,2) | NOT NULL                            | Unit price                        |
| taxRate       | DECIMAL(5,2)  | DEFAULT 0                           | Tax rate for this item            |
| taxAmount     | DECIMAL(15,2) | DEFAULT 0                           | Tax amount                        |
| discountType  | VARCHAR(255)  |                                     | Discount type (percentage, fixed) |
| discountValue | DECIMAL(15,2) | DEFAULT 0                           | Discount value                    |
| totalAmount   | DECIMAL(15,2) | NOT NULL                            | Line total amount                 |

## Finance Module

### `paymentmethods`

| Column      | Type         | Constraints                | Description                             |
| ----------- | ------------ | -------------------------- | --------------------------------------- |
| id          | INT          | PRIMARY KEY, AUTOINCREMENT | Unique method identifier                |
| name        | VARCHAR(255) | NOT NULL                   | Method name (Cash, Bank Transfer, etc.) |
| description | TEXT         |                            | Description                             |
| status      | BOOLEAN      | DEFAULT TRUE               | Whether method is active                |

### `payments`

| Column          | Type          | Constraints                               | Description                            |
| --------------- | ------------- | ----------------------------------------- | -------------------------------------- |
| id              | INT           | PRIMARY KEY, AUTOINCREMENT                | Unique payment identifier              |
| paymentNumber   | VARCHAR(255)  | UNIQUE, NOT NULL                          | Payment reference number               |
| paymentType     | VARCHAR(255)  | NOT NULL                                  | Type (Received, Made)                  |
| paymentDate     | DATE          | NOT NULL                                  | Date of payment                        |
| amount          | DECIMAL(15,2) | NOT NULL                                  | Payment amount                         |
| paymentMethodId | INT           | FOREIGN KEY (paymentMethods.id), NOT NULL | Payment method                         |
| reference       | VARCHAR(255)  |                                           | External reference number              |
| notes           | TEXT          |                                           | Additional notes                       |
| entityType      | VARCHAR(255)  | NOT NULL                                  | Related entity type (invoice, expense) |
| entityId        | INT           | NOT NULL                                  | ID of the related entity               |
| accountId       | INT           | FOREIGN KEY (accounts.id)                 | Related account/customer               |
| createdBy       | INT           | FOREIGN KEY (users.id), NOT NULL          | User who recorded this payment         |

### `expensecategories`

| Column      | Type         | Constraints                | Description                |
| ----------- | ------------ | -------------------------- | -------------------------- |
| id          | INT          | PRIMARY KEY, AUTOINCREMENT | Unique category identifier |
| name        | VARCHAR(255) | NOT NULL                   | Category name              |
| description | TEXT         |                            | Description                |
| status      | BOOLEAN      | DEFAULT TRUE               | Whether category is active |

### `expenses`

| Column             | Type          | Constraints                                  | Description                    |
| ------------------ | ------------- | -------------------------------------------- | ------------------------------ |
| id                 | INT           | PRIMARY KEY, AUTOINCREMENT                   | Unique expense identifier      |
| expenseNumber      | VARCHAR(255)  | UNIQUE, NOT NULL                             | Expense reference number       |
| categoryId         | INT           | FOREIGN KEY (expensecategories.id), NOT NULL | Expense category               |
| expenseDate        | DATE          | NOT NULL                                     | Date of expense                |
| amount             | DECIMAL(15,2) | NOT NULL                                     | Expense amount                 |
| taxAmount          | DECIMAL(15,2) | DEFAULT 0                                    | Tax amount                     |
| totalAmount        | DECIMAL(15,2) | NOT NULL                                     | Total amount                   |
| vendor             | VARCHAR(255)  |                                              | Vendor/supplier name           |
| description        | TEXT          |                                              | Description                    |
| paymentMethodId    | INT           | FOREIGN KEY (paymentMethods.id)              | Payment method                 |
| reference          | VARCHAR(255)  |                                              | Receipt/reference number       |
| isRecurring        | BOOLEAN       | DEFAULT FALSE                                | Whether expense is recurring   |
| recurringFrequency | VARCHAR(255)  |                                              | Frequency if recurring         |
| receiptImage       | VARCHAR(255)  |                                              | Path to receipt image          |
| createdBy          | INT           | FOREIGN KEY (users.id), NOT NULL             | User who recorded this expense |

## Projects & Tasks Module

### `projects`

| Column       | Type          | Constraints                      | Description                                        |
| ------------ | ------------- | -------------------------------- | -------------------------------------------------- |
| id           | INT           | PRIMARY KEY, AUTOINCREMENT       | Unique project identifier                          |
| name         | VARCHAR(255)  | NOT NULL                         | Project name                                       |
| code         | VARCHAR(255)  | UNIQUE                           | Project code                                       |
| description  | TEXT          |                                  | Project description                                |
| startDate    | DATE          |                                  | Project start date                                 |
| endDate      | DATE          |                                  | Target end date                                    |
| status       | VARCHAR(255)  | NOT NULL                         | Status (Not Started, In Progress, Completed, etc.) |
| priority     | VARCHAR(255)  | DEFAULT 'Medium'                 | Priority level                                     |
| accountId    | INT           | FOREIGN KEY (accounts.id)        | Related customer/account                           |
| isBillable   | BOOLEAN       | DEFAULT TRUE                     | Whether project is billable                        |
| billingType  | VARCHAR(255)  |                                  | Billing type (Fixed, Hourly)                       |
| budgetHours  | DECIMAL(10,2) |                                  | Budget in hours                                    |
| budgetAmount | DECIMAL(15,2) |                                  | Budget in currency                                 |
| actualHours  | DECIMAL(10,2) | DEFAULT 0                        | Actual hours spent                                 |
| actualCost   | DECIMAL(15,2) | DEFAULT 0                        | Actual cost incurred                               |
| progress     | INT           | DEFAULT 0                        | Progress percentage (0-100)                        |
| assignedTo   | INT           | FOREIGN KEY (users.id)           | Project manager                                    |
| createdBy    | INT           | FOREIGN KEY (users.id), NOT NULL | User who created this project                      |

### `projectmembers`

| Column     | Type          | Constraints                         | Description                  |
| ---------- | ------------- | ----------------------------------- | ---------------------------- |
| id         | INT           | PRIMARY KEY, AUTOINCREMENT          | Unique membership identifier |
| projectId  | INT           | FOREIGN KEY (projects.id), NOT NULL | References project           |
| userId     | INT           | FOREIGN KEY (users.id), NOT NULL    | Team member                  |
| role       | VARCHAR(255)  |                                     | Role in the project          |
| hourlyRate | DECIMAL(15,2) |                                     | Hourly rate if billable      |
| status     | BOOLEAN       | DEFAULT TRUE                        | Whether member is active     |

### `tasks`

| Column         | Type          | Constraints                         | Description                             |
| -------------- | ------------- | ----------------------------------- | --------------------------------------- |
| id             | INT           | PRIMARY KEY, AUTOINCREMENT          | Unique task identifier                  |
| projectId      | INT           | FOREIGN KEY (projects.id), NOT NULL | Parent project                          |
| parentTaskId   | INT           | FOREIGN KEY (tasks.id)              | Parent task for subtasks                |
| name           | VARCHAR(255)  | NOT NULL                            | Task name                               |
| description    | TEXT          |                                     | Task description                        |
| status         | VARCHAR(255)  | NOT NULL                            | Status (To Do, In Progress, Done, etc.) |
| priority       | VARCHAR(255)  | DEFAULT 'Medium'                    | Priority level                          |
| startDate      | DATE          |                                     | Task start date                         |
| dueDate        | DATE          |                                     | Task due date                           |
| completedDate  | DATE          |                                     | Date of completion                      |
| estimatedHours | DECIMAL(10,2) |                                     | Estimated hours                         |
| actualHours    | DECIMAL(10,2) | DEFAULT 0                           | Actual hours spent                      |
| progress       | INT           | DEFAULT 0                           | Progress percentage (0-100)             |
| assignedTo     | INT           | FOREIGN KEY (users.id)              | Assigned user                           |
| createdBy      | INT           | FOREIGN KEY (users.id), NOT NULL    | User who created this task              |

### `taskcomments`

| Column     | Type         | Constraints                      | Description                  |
| ---------- | ------------ | -------------------------------- | ---------------------------- |
| id         | INT          | PRIMARY KEY, AUTOINCREMENT       | Unique comment identifier    |
| taskId     | INT          | FOREIGN KEY (tasks.id), NOT NULL | Referenced task              |
| comment    | TEXT         | NOT NULL                         | Comment text                 |
| attachment | VARCHAR(255) |                                  | Path to attachment           |
| createdBy  | INT          | FOREIGN KEY (users.id), NOT NULL | User who posted this comment |

### `timeentries`

| Column        | Type          | Constraints                         | Description                           |
| ------------- | ------------- | ----------------------------------- | ------------------------------------- |
| id            | INT           | PRIMARY KEY, AUTOINCREMENT          | Unique entry identifier               |
| projectId     | INT           | FOREIGN KEY (projects.id), NOT NULL | Related project                       |
| taskId        | INT           | FOREIGN KEY (tasks.id)              | Related task                          |
| userId        | INT           | FOREIGN KEY (users.id), NOT NULL    | User who logged time                  |
| description   | TEXT          |                                     | Description of work done              |
| entryDate     | DATE          | NOT NULL                            | Date of work                          |
| startTime     | TIME          |                                     | Start time (optional)                 |
| endTime       | TIME          |                                     | End time (optional)                   |
| duration      | DECIMAL(10,2) | NOT NULL                            | Duration in hours                     |
| isbillable    | BOOLEAN       | DEFAULT TRUE                        | Whether time is billable              |
| billingStatus | VARCHAR(255)  | DEFAULT 'Not Billed'                | Billing status                        |
| hourlyRate    | DECIMAL(15,2) |                                     | Hourly rate if different from default |

## Additional Support Tables

### `activitylog`

| Column      | Type         | Constraints                      | Description                               |
| ----------- | ------------ | -------------------------------- | ----------------------------------------- |
| id          | INT          | PRIMARY KEY, AUTOINCREMENT       | Unique log identifier                     |
| userId      | INT          | FOREIGN KEY (users.id), NOT NULL | User who performed the action             |
| entityType  | VARCHAR(255) | NOT NULL                         | Type of entity affected                   |
| entityId    | INT          | NOT NULL                         | ID of the entity affected                 |
| action      | VARCHAR(255) | NOT NULL                         | Action performed (create, update, delete) |
| description | TEXT         |                                  | Description of the activity               |
| oldValues   | TEXT         |                                  | JSON string of old values (for updates)   |
| newValues   | TEXT         |                                  | JSON string of new values (for updates)   |
| ipaddress   | VARCHAR(45)  |                                  | IP address of the user                    |
| useragent   | VARCHAR(255) |                                  | User agent/browser info                   |

### `notifications`

| Column     | Type         | Constraints                      | Description                    |
| ---------- | ------------ | -------------------------------- | ------------------------------ |
| id         | INT          | PRIMARY KEY, AUTOINCREMENT       | Unique notification identifier |
| userId     | INT          | FOREIGN KEY (users.id), NOT NULL | User to notify                 |
| type       | VARCHAR(255) | NOT NULL                         | Notification type              |
| title      | VARCHAR(255) | NOT NULL                         | Notification title             |
| message    | TEXT         | NOT NULL                         | Notification message           |
| entityType | VARCHAR(255) |                                  | Related entity type            |
| entityId   | INT          |                                  | ID of the related entity       |
| isread     | BOOLEAN      | DEFAULT FALSE                    | Whether notification is read   |
| readat     | TIMESTAMP    |                                  | When notification was read     |

### `emailtemplates`

| Column      | Type         | Constraints                      | Description                     |
| ----------- | ------------ | -------------------------------- | ------------------------------- |
| id          | INT          | PRIMARY KEY, AUTOINCREMENT       | Unique template identifier      |
| name        | VARCHAR(255) | NOT NULL                         | Template name                   |
| subject     | VARCHAR(255) | NOT NULL                         | Email subject                   |
| body        | TEXT         | NOT NULL                         | Email body (HTML)               |
| description | TEXT         |                                  | Template description            |
| category    | VARCHAR(255) | NOT NULL                         | Category (Invoice, Quote, etc.) |
| status      | BOOLEAN      | DEFAULT TRUE                     | Whether template is active      |
| createdBy   | INT          | FOREIGN KEY (users.id), NOT NULL | User who created this template  |

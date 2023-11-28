# Palit-A-Nearby-Vendor-Commerce-App
# App Development Plan

## Developers:<br/>
Badilla, Mark Kenneth<br/>
Briones, Joshua<br/>
Coyoca, Alestair Cyril<br/>
Selma, Kheisa

## Overview
Palit is a web app that connects nearby vendors and customers who want to buy or sell goods or services in a convenient and cash-based way. The app uses realtime geolocation to show the users' locations on a map and allows them to chat and transact with each other.

## Features Overview
#### User Categories
- **Customers**: Order from vendors.
- **Vendors**: Sell goods/services and manage their stores.
- **Admins**: Access the database with CRUD capabilities.

#### Account Registration
- **Sign Up**: Users provide their email, name, and birthdate, and choose to register as a customer or vendor.
- **Admin Login**: Separate login at `/adminsignin` for predefined admin accounts; admins are not created through the signup process.

#### Admin Dashboard
- **Interface**: A sidebar for navigation, with a default dashboard showing statistics and table headers.

#### Map Functionality
- **User Locations**: Displays user locations within a 200-meter radius, excluding admins. Different icons represent different user types and states.

#### Icons
- **Vendor Icons**: Vary based on the store's category.
- **Customer Icons**: Light or dark blue to indicate order status.

#### Reporting System
- **Function**: Users report issues or provide feedback via a report icon, with admins responding through email.

#### Store Management
- **Floating Window**: A sidebar for vendors to manage their store details and products/services. New vendors see a placeholder store setup.

#### Customer Store Interaction
- **Selection and Ordering**: Customers select a vendor to view and order from their store, with the ability to cancel orders.

#### Chat System
- **Communication**: Customers and vendors negotiate and give feedback. Includes transaction status updates and a rating system post-completion.

#### Customer Queue Management
- **Vendor View**: A list of customers ordering, with current serving status highlighted and an easy transition to chat for order acceptance.

#### Payment System
- **Cash on Delivery**: Customers pay upon receipt of goods/services, no in-app payment due to limitations.

#### Additional Pages
- **About Us**: Information about the development team.
- **Contact Us**: A form for reaching out to developers.
- **Services**: A summary of app offerings.

### Limitations
- **No In-App Payment**: Excluded due to time constraints and security concerns.
- **Developer Experience**: The team is composed of students learning necessary frameworks and technologies, with a focus on React for front-end development.

# Diagrams so far:

- Class diagram:
```
@startuml
class User {
    - int userId
    - String name
    - Date birthDate
    - byte[] image
    - int accountId
    - boolean isDeleted
    + int getUserId()
    + void setUserId(int userId)
    + String getName()
    + void setName(String name)
    + Date getBirthDate()
    + void setBirthDate(Date birthDate)
    + byte[] getImage()
    + void setImage(byte[] image)
    + int getAccountId()
    + void setAccountId(int accountId)
    + boolean getIsDeleted()
    + void setIsDeleted(boolean isDeleted)
}

class Account {
    - int accountId
    - String email
    - String password
    - boolean isVendor
    - boolean isAdmin
    - int locationId
    - int storeId
    - boolean isDeleted
    + int getAccountId()
    + void setAccountId(int accountId)
    + String getEmail()
    + void setEmail(String email)
    + String getPassword()
    + void setPassword(String password)
    + boolean getIsVendor()
    + void setIsVendor(boolean isVendor)
    + boolean getIsAdmin()
    + void setIsAdmin(boolean isAdmin)
    + int getLocationId()
    + void setLocationId(int locationId)
    + int getStoreId()
    + void setStoreId(int storeId)
    + boolean getIsDeleted()
    + void setIsDeleted(boolean isDeleted)
}

User "1" -- "1" Account : has

class Store {
    - int storeId
    - String storeName
    - String description
    - String category
    - int rating
    - boolean isDeleted
    + int getStoreId()
    + void setStoreId(int storeId)
    + String getStoreName()
    + void setStoreName(String storeName)
    + String getDescription()
    + void setDescription(String description)
    + String getCategory()
    + void setCategory(String category)
    + int getRating()
    + void setRating(int rating)
    + boolean getIsDeleted()
    + void setIsDeleted(boolean isDeleted)
}

Account "1" -- "1" Store : owns

class ProductService {
    - int productId
    - String name
    - double price
    - int storeId
    - byte[] image
    - boolean isDeleted
    + int getProductId()
    + void setProductId(int productId)
    + String getName()
    + void setName(String name)
    + double getPrice()
    + void setPrice(double price)
    + int getStoreId()
    + void setStoreId(int storeId)
    + byte[] getImage()
    + void setImage(byte[] image)
    + boolean getIsDeleted()
    + void setIsDeleted(boolean isDeleted)
}

Store "1" -- "*" ProductService : offers

class Location {
    - int locationId
    - double latitude
    - double longitude
    - boolean isDeleted
    - boolean isActive
    + int getLocationId()
    + void setLocationId(int locationId)
    + double getLatitude()
    + void setLatitude(double latitude)
    + double getLongitude()
    + void setLongitude(double longitude)
    + boolean getIsActive()
    + void setIsActive(boolean isActive)
    + boolean getIsDeleted()
    + void setIsDeleted(boolean isDeleted)
}

Account "1" -- "1" Location : has

class Conversation {
    - int conversationId
    - int customerAccountId
    - int vendorAccountId
    - boolean isDeleted
    + int getConversationId()
    + void setConversationId(int conversationId)
    + int getCustomerAccountId()
    + void setCustomerAccountId(int customerAccountId)
    + int getVendorAccountId()
    + void setVendorAccountId(int vendorAccountId)
    + boolean getIsDeleted()
    + void setIsDeleted(boolean isDeleted)
}

Account "*" -- "*" Conversation : participates in

class Chat {
    - int chatId
    - int senderId
    - int receiverId
    - String messageContent
    - Timestamp timestamp
    - int conversationId
    - boolean isDeleted
    + int getChatId()
    + void setChatId(int chatId)
    + int getSenderId()
    + void setSenderId(int senderId)
    + int getReceiverId()
    + void setReceiverId(int receiverId)
    + String getMessageContent()
    + void setMessageContent(String messageContent)
    + Timestamp getTimestamp()
    + void setTimestamp(Timestamp timestamp)
    + int getConversationId()
    + void setConversationId(int conversationId)
    + boolean getIsDeleted()
    + void setIsDeleted(boolean isDeleted)
}

Account "*" -- "*" Chat : sends

Chat "*" -- "1" Conversation : belongs to

class Transaction {
    - int accountCustomerId
    - int accountVendorId
    - String status
    - int rating
    - boolean isDeleted
    + int getAccountCustomerId()
    + void setAccountCustomerId(int accountCustomerId)
    + int getAccountVendorId()
    + void setAccountVendorId(int accountVendorId)
    + String getStatus()
    + void setStatus(String status)
    + int getRating()
    + void setRating(int rating)
    + boolean getIsDeleted()
    + void setIsDeleted(boolean isDeleted)
}

Account "*" -- "*" Transaction : involves

class Report {
    - int reportId
    - int senderId
    - String messageContent
    - Timestamp timestamp
    - boolean isResolved
    - boolean isDeleted
    + int getReportId()
    + void setReportId(int reportId)
    + int getSenderId()
    + void setSenderId(int senderId)
    + String getMessageContent()
    + void setMessageContent(String messageContent)
    + Timestamp getTimestamp()
    + void setTimestamp(Timestamp timestamp)
    + boolean getIsResolved()
    + void setIsResolved(boolean isResolved)
    + boolean getIsDeleted()
    + void setIsDeleted(boolean isDeleted)
}

Account "1" -- "*" Report : sends

@enduml

```
----------------------------------------------------












----------------------------------------------------

- ERD:
```
@startuml

entity User {
    * userId : INT
    --
    name : VARCHAR(255)
    birthDate : DATE
    image : BLOB
    accountId : INT
    isDeleted : BOOLEAN
}

entity Account {
    * accountId : INT
    --
    email : VARCHAR(255)
    password : VARCHAR(255)
    isVendor : BOOLEAN
    isAdmin : BOOLEAN
    locationId : INT
    storeId : INT
    isDeleted : BOOLEAN
}

User ||--|| Account

entity Store {
    * storeId : INT
    --
    storeName : VARCHAR(255)
    description : VARCHAR(255)
    category : VARCHAR(255)
    rating : INT
    isDeleted : BOOLEAN
}

Account ||--o| Store

entity ProductService {
    * productId : INT
    --
    name : VARCHAR(255)
    price : DOUBLE
    storeId : INT
    image : BLOB
    isDeleted : BOOLEAN
}

Store ||--o{ ProductService

entity Location {
    * locationId : INT
    --
    latitude : DOUBLE
    longitude : DOUBLE
    isActive : BOOLEAN
    isDeleted : BOOLEAN
}

Account ||--o| Location

entity Conversation {
    * conversationId : INT
    --
    customerAccountId : INT
    vendorAccountId : INT
    isDeleted : BOOLEAN
}

Account ||--o{ Conversation

entity Chat {
    * chatId : INT
    --
    senderId : INT
    receiverId : INT
    messageContent : VARCHAR(255)
    timestamp : TIMESTAMP
    conversationId : INT
    isDeleted : BOOLEAN
}

Account ||--o{ Chat
Chat ||--|| Conversation

entity Transaction {
    * accountCustomerId : INT
    * accountVendorId : INT
    --
    status : VARCHAR(255)
    rating : INT
    isDeleted : BOOLEAN
}

Account ||--o{ Transaction

entity Report {
    * reportId : INT
    --
    senderId : INT
    messageContent : VARCHAR(255)
    timestamp : TIMESTAMP
    isResolved : BOOLEAN
    isDeleted : BOOLEAN
}

Account ||--o{ Report

@enduml

```
-----------------------------------------------------














-----------------------------------------------------
Here is the generic system wide use case diagram:

```
@startuml
left to right direction
skinparam packageStyle rectangle
actor Customer
actor Vendor
actor Admin
rectangle Palit {
  Customer -- (Sign up)
  Customer -- (Log in)
  Customer -- (View map)
  Customer -- (View store)
  Customer -- (Place order)
  Customer -- (Cancel order)
  Customer -- (Chat with vendor)
  Customer -- (Rate vendor)
  Customer -- (Report issue)
  Vendor -- (Sign up)
  Vendor -- (Log in)
  Vendor -- (View map)
  Vendor -- (View store)
  Vendor -- (Edit store)
  Vendor -- (Accept order)
  Vendor -- (Complete order)
  Vendor -- (Chat with customer)
  Vendor -- (Report issue)
  Admin -- (Log in)
  Admin -- (View dashboard)
  Admin -- (Manage database)
}
@enduml
```

Here are the specific use case diagrams for each use case in the generic system wide use case diagram:

- Sign up:

```
@startuml
left to right direction
actor Customer
actor Vendor
rectangle Palit {
  Customer -- (Sign up)
  Vendor -- (Sign up)
  (Sign up) ..> (Enter email) : include
  (Sign up) ..> (Enter name) : include
  (Sign up) ..> (Enter birth date) : include
  (Sign up) ..> (Choose role) : include
  (Sign up) ..> (Create password) : include
  (Sign up) ..> (Confirm password) : include
  (Sign up) ..> (Submit) : include
}
@enduml
```

- Log in:

```
@startuml
left to right direction
actor Customer
actor Vendor
actor Admin
rectangle Palit {
  Customer -- (Log in)
  Vendor -- (Log in)
  Admin -- (Log in)
  (Log in) ..> (Enter email) : include
  (Log in) ..> (Enter password) : include
  (Log in) ..> (Submit) : include
}
@enduml
```

- View map:

```
@startuml
left to right direction
actor Customer
actor Vendor
rectangle Palit {
  Customer -- (View map)
  Vendor -- (View map)
  (View map) ..> (See own location) : extend
  (View map) ..> (See nearby users) : extend
  (View map) ..> (Tap on user icon) : extend
  (View map) ..> (Refresh map) : extend
  (View map) ..> (Report issue) : extend
}
@enduml
```

- View store:

```
@startuml
left to right direction
actor Customer
actor Vendor
rectangle Palit {
  Customer -- (View store)
  Vendor -- (View store)
  (View store) ..> (See store details) : include
  (View store) ..> (See products/services) : include
  Customer ..> (View store) : extends
  Vendor ..> (Edit store) : extends
}
@enduml
```

- Place order:

```
@startuml
left to right direction
actor Customer
rectangle Palit {
  Customer -- (Place order)
  (Place order) ..> (Select quantity) : include
  (Place order) ..> (See total price) : include
  (Place order) ..> (Tap order button) : include
  (Place order) ..> (Send transaction in chat) : include
}
@enduml
```

- Cancel order:

```
@startuml
left to right direction
actor Customer
rectangle Palit {
  Customer -- (Cancel order)
  (Cancel order) ..> (Tap cancel order button) : include
  (Cancel order) ..> (Change transaction status in chat) : include
}
@enduml
```

- Chat:

```
@startuml
left to right direction
actor Customer
actor Vendor
rectangle Palit {
  Customer -- (Chat with vendor)
  Vendor -- (Chat with customer)
  (Chat with vendor) ..> (Send message) : include
  (Chat with vendor) ..> (Receive message) : include
  (Chat with vendor) ..> (See transaction status) : include
  (Chat with vendor) ..> (Rate vendor) : extend
  (Chat with customer) ..> (Send message) : include
  (Chat with customer) ..> (Receive message) : include
  (Chat with customer) ..> (See transaction status) : include
  (Chat with customer) ..> (Accept order) : extend
  (Chat with customer) ..> (Complete order) : include
}
@enduml
```

- Rate vendor:

```
@startuml
left to right direction
actor Customer
rectangle Palit {
  Customer -- (Rate vendor)
  (Rate vendor) ..> (Fill out 5 star form) : include
  (Rate vendor) ..> (Submit rating) : include
  (Rate vendor) ..> (Update vendor rating) : include
}
@enduml
```

- Report issue:

```
@startuml
left to right direction
actor Customer
actor Vendor
rectangle Palit {
  Customer -- (Report issue)
  Vendor -- (Report issue)
  (Report issue) ..> (Tap report icon) : include
  (Report issue) ..> (Enter message) : include
  (Report issue) ..> (Submit report) : include
  (Report issue) ..> (Send report to admin) : include
}
@enduml
```

- Edit store:

```
@startuml
left to right direction
actor Vendor
rectangle Palit {
  Vendor -- (Edit store)
  (Edit store) ..> (Tap edit button) : include
  (Edit store) ..> (Enter store name) : include
  (Edit store) ..> (Enter store description) : include
  (Edit store) ..> (Choose store category) : include
  (Edit store) ..> (Manage product/service) : include
  (Manage product/service) ..> (Enter product/service name) : include
  (Manage product/service) ..> (Enter product/service price) : include
  (Manage product/service) ..> (Upload product/service image) : include
  (Edit store) ..> (Save changes) : include
}
@enduml
```

- Accept order:

```
@startuml
left to right direction
actor Vendor
rectangle Palit {
  Vendor -- (Accept order)
  (Accept order) ..> (Tap accept button) : include
  (Accept order) ..> (Change transaction status in chat) : include
  (Accept order) ..> (Update customer queue) : include
}
@enduml
```

- Complete order:

```
@startuml
left to right direction
actor Vendor
rectangle Palit {
  Vendor -- (Complete order)
  (Complete order) ..> (Tap complete button) : include
  (Complete order) ..> (Change transaction status in chat) : include
  (Complete order) ..> (Update customer queue) : include
}
@enduml
```

- Log in (admin):

```
@startuml
left to right direction
actor Admin
rectangle Palit {
  Admin -- (Log in)
  (Log in) ..> (Enter email) : include
  (Log in) ..> (Enter password) : include
  (Log in) ..> (Submit) : include
}
@enduml
```

- View dashboard (admin):

```
@startuml
left to right direction
actor Admin
rectangle Palit {
  Admin -- (View dashboard)
  (View dashboard) ..> (See reports) : include
  (View dashboard) ..> (See users) : include
  (View dashboard) ..> (See stores) : include
  (View dashboard) ..> (See products/services) : include
  (View dashboard) ..> (See transactions) : include
}
@enduml
```

- Manage database (admin):

```
@startuml
left to right direction
actor Admin
rectangle Palit {
  Admin -- (Manage database)
  (Manage database) ..> (Create record) : extend
  (Manage database) ..> (Read record) : extend
  (Manage database) ..> (Update record) : extend
  (Manage database) ..> (Delete record) : extend
}
@enduml
```
----------------------------------------------------
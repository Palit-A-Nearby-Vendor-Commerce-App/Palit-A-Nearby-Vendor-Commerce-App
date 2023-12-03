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
- **Communication**: Customers and vendors negotiate and give feedback. Includes transaction status updates.

#### Customer Queue Management
- **Vendor View**: A list of customers ordering, with current serving status highlighted and an easy transition to chat for order acceptance.

#### Payment System
- **Cash on Delivery**: Customers pay upon receipt of goods/services, no in-app payment due to limitations.

#### Additional Pages
- **About Us**: Information about the development team.
- **Contact Us**: A form for reaching out to developers.
- **Services**: A summary of app offerings.

# Diagrams in PlantUML:

- Class diagram:
```
@startuml
class User {
    - int userId
    - String firstName
    - String lastName
    - Date birthDate
    - byte[] image
    - boolean isDeleted
    - AccountEntity account
    + int getUserId()
    + void setUserId(int userId)
    + String getFirstName()
    + void setFirstName(String firstName)
    + String getLastName()
    + void setLastName(String lastName)
    + Date getBirthDate()
    + void setBirthDate(Date birthDate)
    + byte[] getImage()
    + void setImage(byte[] image)
    + boolean getIsDeleted()
    + void setIsDeleted(boolean isDeleted)
    + AccountEntity getAccount()
    + void setAccount(AccountEntity account)
}

class Account {
    - int accountId
    - String email
    - String password
    - boolean isVendor
    - boolean isAdmin
    - boolean isDeleted
    - UserEntity user
    - LocationEntity location
    - StoreEntity store
    - Set<TransactionEntity> customerTransactions
    - Set<ChatEntity> chats
    - Set<ConversationEntity> conversations
    - Set<TransactionEntity> vendorTransactions
    - List<ReportEntity> reports
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
    + boolean getIsDeleted()
    + void setIsDeleted(boolean isDeleted)
    + UserEntity getUser()
    + void setUser(UserEntity user)
    + LocationEntity getLocation()
    + void setLocation(LocationEntity location)
    + StoreEntity getStore()
    + void setStore(StoreEntity store)
    + Set<TransactionEntity> getCustomerTransactions()
    + void setCustomerTransactions(Set<TransactionEntity> customerTransactions)
    + Set<ChatEntity> getChats()
    + void setChats(Set<ChatEntity> chats)
    + Set<ConversationEntity> getConversations()
    + void setConversations(Set<ConversationEntity> conversations)
    + Set<TransactionEntity> getVendorTransactions()
    + void setVendorTransactions(Set<TransactionEntity> vendorTransactions)
    + List<ReportEntity> getReports()
    + void setReports(List<ReportEntity> reports)
}

User "1" -- "1" Account : has

class Store {
    - int storeId
    - String storeName
    - String description
    - String category
    - boolean isDeleted
    - AccountEntity account
    - List<ProductServiceEntity> productServices
    + int getStoreId()
    + void setStoreId(int storeId)
    + String getStoreName()
    + void setStoreName(String storeName)
    + String getDescription()
    + void setDescription(String description)
    + String getCategory()
    + void setCategory(String category)
    + boolean getIsDeleted()
    + void setIsDeleted(boolean isDeleted)
    + AccountEntity getAccount()
    + void setAccount(AccountEntity account)
    + List<ProductServiceEntity> getProductServices()
    + void setProductServices(List<ProductServiceEntity> productServices)
}

Account "1" -- "1" Store : owns

class ProductService {
    - int productId
    - String name
    - double price
    - byte[] image
    - boolean isDeleted
    - StoreEntity store
    + int getProductId()
    + void setProductId(int productId)
    + String getName()
    + void setName(String name)
    + double getPrice()
    + void setPrice(double price)
    + byte[] getImage()
    + void setImage(byte[] image)
    + boolean getIsDeleted()
    + void setIsDeleted(boolean isDeleted)
    + StoreEntity getStore()
    + void setStore(StoreEntity store)
}

Store "1" -- "*" ProductService : offers

class Location {
    - int locationId
    - double latitude
    - double longitude
    - boolean isDeleted
    - boolean isActive
    - AccountEntity account
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
    + AccountEntity getAccount()
    + void setAccount(AccountEntity account)
}

Account "1" -- "1" Location : has

class Conversation {
    - int conversationId
    - boolean isDeleted
    - AccountEntity vendor
    - AccountEntity customer
    - Set<ChatEntity> chats
    + int getConversationId()
    + void setConversationId(int conversationId)
    + boolean getIsDeleted()
    + void setIsDeleted(boolean isDeleted)
    + AccountEntity getVendor()
    + void setVendor(AccountEntity vendor)
    + AccountEntity getCustomer()
    + void setCustomer(AccountEntity customer)
    + Set<ChatEntity> getChats()
    + void setChats(Set<ChatEntity> chats)
}

Account "*" -- "*" Conversation : participates in
Account "1" -- "*" Chat : sends

class Chat {
    - int chatId
    - String messageContent
    - Timestamp timestamp
    - boolean isDeleted
    - AccountEntity account
    - ConversationEntity conversation
    + int getChatId()
    + void setChatId(int chatId)
    + String getMessageContent()
    + void setMessageContent(String messageContent)
    + Timestamp getTimestamp()
    + void setTimestamp(Timestamp timestamp)
    + boolean getIsDeleted()
    + void setIsDeleted(boolean isDeleted)
    + AccountEntity getAccount()
    + void setAccount(AccountEntity account)
    + ConversationEntity getConversation()
    + void setConversation(ConversationEntity conversation)
}

Chat "*" -- "1" Conversation : belongs to

class Transaction {
    - int transactionId
    - String status
    - String details
    - boolean isDeleted
    - AccountEntity customer
    - AccountEntity vendor
    + int getTransactionId()
    + void setTransactionId(int transactionId)
    + String getStatus()
    + void setStatus(String status)
    + String getDetails()
    + void setDetails(String details)
    + boolean getIsDeleted()
    + void setIsDeleted(boolean isDeleted)
    + AccountEntity getCustomer()
    + void setCustomer(AccountEntity customer)
    + AccountEntity getVendor()
    + void setVendor(AccountEntity vendor)
}

Account "*" -- "*" Transaction : involves

class Report {
    - int reportId
    - String messageContent
    - Timestamp timestamp
    - boolean isResolved
    - boolean isDeleted
    - AccountEntity account
    + int getReportId()
    + void setReportId(int reportId)
    + String getMessageContent()
    + void setMessageContent(String messageContent)
    + Timestamp getTimestamp()
    + void setTimestamp(Timestamp timestamp)
    + boolean getIsResolved()
    + void setIsResolved(boolean isResolved)
    + boolean getIsDeleted()
    + void setIsDeleted(boolean isDeleted)
    + AccountEntity getAccount()
    + void setAccount(AccountEntity account)
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
    userId int [PK]
    --
    firstName varchar(255)
    lastName varchar(255)
    birthDate date
    image blob
    accountId int [FK]
    isDeleted boolean
}

entity Account {
    accountId int [PK]
    --
    email varchar(255)
    password varchar(255)
    isVendor boolean
    isAdmin boolean
    locationId int [FK]
    storeId int [FK]
    isDeleted boolean
}

User ||--|| Account

entity Store {
    storeId int [PK]
    --
    storeName varchar(255)
    description text
    category varchar(255)
    isDeleted boolean
}

Account ||--|| Store

entity ProductService {
    productId int [PK]
    --
    name varchar(255)
    price decimal(10,2)
    storeId int [FK]
    image blob
    isDeleted boolean
}

Store ||--|{ ProductService

entity Location {
    locationId int [PK]
    --
    latitude double
    longitude double
    isDeleted boolean
    isActive boolean
}

Account ||--|| Location

entity Conversation {
    conversationId int [PK]
    --
    customerAccountId int [FK]
    vendorAccountId int [FK]
    isDeleted boolean
}

Account }|..|{ Conversation

entity Chat {
    chatId int [PK]
    --
    senderId int [FK]
    messageContent text
    timestamp timestamp
    conversationId int [FK]
    isDeleted boolean
}

Account ||--|{ Chat
Chat }|..|| Conversation

entity Transaction {
    int transactionId [PK]
    --
    accountCustomerId int [FK]
    accountVendorId int [FK]
    status varchar(255)
    details varchar(255)
    timestamp timestamp
    isDeleted boolean
}

Account }|..|{ Transaction

entity Report {
    reportId int [PK]
    --
    senderId int [FK]
    messageContent text
    timestamp timestamp
    isResolved boolean
    isDeleted boolean
}

Account ||--|{ Report

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
  (Chat with customer) ..> (Send message) : include
  (Chat with customer) ..> (Receive message) : include
  (Chat with customer) ..> (See transaction status) : include
  (Chat with customer) ..> (Accept order) : extend
  (Chat with customer) ..> (Complete order) : include
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

- CRUD via dashboard (admin):

```
@startuml
left to right direction
actor Admin
rectangle Palit {
  Admin -- (View dashboard)
  (View dashboard) ..> (See reports) : include
  (View dashboard) ..> (See users) : include
  (View dashboard) ..> (See accounts) : include
  (View dashboard) ..> (See conversations) : include
  (View dashboard) ..> (See chats) : include
  (View dashboard) ..> (See stores) : include
  (View dashboard) ..> (See products/services) : include
  (View dashboard) ..> (See transactions) : include
  (See reports) ..> (Create report) : extend
  (See reports) ..> (Update report) : extend
  (See reports) ..> (Delete report) : extend
  (See users) ..> (Create user) : extend
  (See users) ..> (Update user) : extend
  (See users) ..> (Delete user) : extend
  (See accounts) ..> (Create account) : extend
  (See accounts) ..> (Update account) : extend
  (See accounts) ..> (Delete account) : extend
  (See conversations) ..> (Create conversation) : extend
  (See conversations) ..> (Update conversation) : extend
  (See conversations) ..> (Delete conversation) : extend
  (See chats) ..> (Create chat) : extend
  (See chats) ..> (Update chat) : extend
  (See chats) ..> (Delete chat) : extend
  (See stores) ..> (Create store) : extend
  (See stores) ..> (Update store) : extend
  (See stores) ..> (Delete store) : extend
  (See products/services) ..> (Create product/service) : extend
  (See products/services) ..> (Update product/service) : extend
  (See products/services) ..> (Delete product/service) : extend
  (See transactions) ..> (Create transaction) : extend
  (See transactions) ..> (Update transaction) : extend
  (See transactions) ..> (Delete transaction) : extend
}
@enduml
```

----------------------------------------------------
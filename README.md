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

- Entity Relationship Diagram:
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

User ||--|| Account : has

entity Store {
    storeId int [PK]
    --
    storeName varchar(255)
    description text
    category varchar(255)
    isDeleted boolean
}

Account ||--o| Store : owns

entity ProductService {
    productId int [PK]
    --
    name varchar(255)
    price decimal(10,2)
    storeId int [FK]
    image blob
    isDeleted boolean
}

Store ||--o{ ProductService : offers

entity Location {
    locationId int [PK]
    --
    latitude double
    longitude double
    isDeleted boolean
    isActive boolean
}

Account ||--|| Location : has

entity Conversation {
    conversationId int [PK]
    --
    customerAccountId int [FK]
    vendorAccountId int [FK]
    isDeleted boolean
}

Account }|--o{ Conversation : participates in

entity Chat {
    chatId int [PK]
    --
    senderId int [FK]
    messageContent text
    timestamp timestamp
    conversationId int [FK]
    isDeleted boolean
}

Account ||--o{ Chat : sends
Chat }|--|| Conversation : belongs to

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

Account }|--|{ Transaction : involves

entity Report {
    reportId int [PK]
    --
    senderId int [FK]
    messageContent text
    timestamp timestamp
    isResolved boolean
    isDeleted boolean
}

Account ||--o{ Report : sends

@enduml
```

- Generic system wide use case diagram:

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
- Specific use case diagrams:

**Sign up:**

```
@startuml
left to right direction
actor Customer
actor Vendor
rectangle Palit {
  Customer -- (Sign up as customer)
  Vendor -- (Sign up as vendor)
  (Sign up as customer) ..> (Enter email) : include
  (Sign up as customer) ..> (Enter name) : include
  (Sign up as customer) ..> (Enter birth date) : include
  (Sign up as customer) ..> (Choose role "customer") : include
  (Sign up as customer) ..> (Create password) : include
  (Sign up as customer) ..> (Submit) : include
  
  (Sign up as vendor) ..> (Enter email) : include
  (Sign up as vendor) ..> (Enter name) : include
  (Sign up as vendor) ..> (Enter birth date) : include
  (Sign up as vendor) ..> (Choose role "vendor") : include
  (Sign up as vendor) ..> (Create password) : include
  (Sign up as vendor) ..> (Enter store name) : include
  (Sign up as vendor) ..> (Enter store description) : include
  (Sign up as vendor) ..> (Choose store category) : include
  (Sign up as vendor) ..> (Submit) : include
}
@enduml
```

**Log in as regular user:**

```
@startuml
left to right direction
actor Customer
actor Vendor
rectangle Palit {
  Customer -- (Log in as regular user)
  Vendor -- (Log in as regular user)
  (Log in as regular user) ..> (Enter email) : include
  (Log in as regular user) ..> (Enter password) : include
  (Log in as regular user) ..> (Submit) : include
}
@enduml
```

**Log in as admin:**

```
@startuml
left to right direction
actor Admin
rectangle Palit {
  Admin -- (Log in as admin)
  (Log in as admin) ..> (Enter email) : include
  (Log in as admin) ..> (Enter password) : include
  (Log in as admin) ..> (Submit) : include
}
@enduml
```

**View map:**

```
@startuml
left to right direction
actor Customer
actor Vendor
rectangle Palit {
  Customer -- (View map)
  Vendor -- (View map)
  (View map) ..> (See own location) : include
  (View map) ..> (See nearby users) : include
  (View map) <.. (Tap on user icon) : extend
  (View map) <.. (Report issue) : extend
}
@enduml
```

**View store:**

```
@startuml
left to right direction
actor Customer
actor Vendor
rectangle Palit {
  Customer -- (View store as viewer)
  Vendor -- (View store as owner)
  (View store as viewer) ..> (See store details) : include
  (View store as owner) ..> (See store details) : include
  (View store as viewer) ..> (See products/services) : include
  (View store as owner) ..> (See products/services) : include
  (View store as owner) ..> (Edit store) : extends
}
@enduml
```

**Place order as customer:**

```
@startuml
left to right direction
actor Customer
rectangle Palit {
  Customer -- (Place order)
  (Place order) ..> (See total price) : include
  (Place order) ..> (Select quantity) : include
  (Select quantity) ..> (Tap order button) : include
}
@enduml
```

**Cancel order as customer:**

```
@startuml
left to right direction
actor Customer
rectangle Palit {
  Customer -- (Cancel order)
  (Cancel order) ..> (Tap cancel order button) : include
}
@enduml
```

**Chat:**

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
  (Chat with customer) ..> (Send message) : include
  (Chat with customer) ..> (Receive message) : include
}
@enduml
```

**Report issue:**

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

**Edit store as owner:**

```
@startuml
left to right direction
actor Vendor
rectangle Palit {
  Vendor -- (Edit store)
  (Edit store) ..> (Tap edit button) : include
  (Tap edit button) <.. (Enter store name) : extend
  (Tap edit button) <.. (Enter store description) : extend
  (Tap edit button) <.. (Choose store category) : extend
  (Tap edit button) <.. (Manage product/service) : extend
  (Manage product/service) <.. (Enter product/service name) : extend
  (Manage product/service) <.. (Enter product/service price) : extend
  (Manage product/service) <.. (Upload product/service image) : extend
  (Tap edit button) <.. (Save changes) : extend
}
@enduml
```

**Accept order as vendor:**

```
@startuml
left to right direction
actor Vendor
rectangle Palit {
  Vendor -- (Accept order)
  (Accept order) ..> (Tap accept button) : include
  (Tap accept button) ..> (Update customer queue) : include
}
@enduml
```

**Complete order as vendor:**

```
@startuml
left to right direction
actor Vendor
rectangle Palit {
  Vendor -- (Complete order)
  (Complete order) ..> (Tap complete button) : include
  (Tap complete button) ..> (Update customer queue) : include
}
@enduml
```

**Administrator Operations Via Admin Dashboard:**

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
  (See reports) <.. (Create report) : extend
  (See reports) <.. (Update report) : extend
  (See reports) <.. (Delete report) : extend
  (See users) <.. (Create user) : extend
  (See users) <.. (Update user) : extend
  (See users) <.. (Delete user) : extend
  (See accounts) <.. (Create account) : extend
  (See accounts) <.. (Update account) : extend
  (See accounts) <.. (Delete account) : extend
  (See conversations) <.. (Create conversation) : extend
  (See conversations) <.. (Update conversation) : extend
  (See conversations) <.. (Delete conversation) : extend
  (See chats) <.. (Create chat) : extend
  (See chats) <.. (Update chat) : extend
  (See chats) <.. (Delete chat) : extend
  (See stores) <.. (Create store) : extend
  (See stores) <.. (Update store) : extend
  (See stores) <.. (Delete store) : extend
  (See products/services) <.. (Create product/service) : extend
  (See products/services) <.. (Update product/service) : extend
  (See products/services) <.. (Delete product/service) : extend
  (See transactions) <.. (Create transaction) : extend
  (See transactions) <.. (Update transaction) : extend
  (See transactions) <.. (Delete transaction) : extend
}
@enduml
```

**Activity Diagrams**

Sure, here are all the activity diagrams:

**Sign Up Process:**
```
@startuml
start

:Choose role;
if (Role is Customer) then (yes)
  :Enter email;
  :Enter name;
  :Enter birth date;
  :Create password;
  :Submit;
else (Vendor)
  :Enter email;
  :Enter name;
  :Enter birth date;
  :Create password;
  :Enter store name;
  :Enter store description;
  :Choose store category;
  :Submit;
endif

stop
@enduml
```

**Log In as Regular User:**
```
@startuml
start

:Enter email;
:Enter password;
:Submit;

stop
@enduml
```

**Log In as Admin:**
```
@startuml
start

:Enter email;
:Enter password;
:Submit;

stop
@enduml
```

**View Map:**
```
@startuml
start

:See own location;
:See nearby users;
if (Need to interact with user icon) then (yes)
  :Tap on user icon;
endif
if (Need to report issue) then (yes)
  :Report issue;
endif

stop
@enduml
```

**View Store:**
```
@startuml
start

:See store details;
:See products/services;
if (User is Vendor) then (yes)
  :Edit store;
endif

stop
@enduml
```

**Place Order as Customer:**
```
@startuml
start

:See total price;
:Select quantity;
:Tap order button;

stop
@enduml
```

**Cancel Order as Customer:**
```
@startuml
start

:Tap cancel order button;

stop
@enduml
```

**Chat:**
```
@startuml
start

:Send message;
:Receive message;

stop
@enduml
```

**Report Issue:**
```
@startuml
start

:Tap report icon;
:Enter message;
:Submit report;
:Send report to admin;

stop
@enduml
```

**Edit Store as Owner:**
```
@startuml
start

:Tap edit button;
if (Need to change store name) then (yes)
  :Enter store name;
endif
if (Need to change store description) then (yes)
  :Enter store description;
endif
if (Need to change store category) then (yes)
  :Choose store category;
endif
if (Need to manage product/service) then (yes)
  :Enter product/service name;
  :Enter product/service price;
  :Upload product/service image;
endif
:Save changes;

stop
@enduml
```

**Accept Order as Vendor:**
```
@startuml
start

:Tap accept button;
:Update customer queue;

stop
@enduml
```

**Complete Order as Vendor:**
```
@startuml
start

:Tap complete button;
:Update customer queue;

stop
@enduml
```

**Administrator Operations Via Admin Dashboard:**
```
@startuml
start

:View dashboard;
if (Interact with reports) then (yes)
  :See reports;
  if (Update report) then (yes)
    :Update report;
  elseif (Delete report) then (yes)
    :Delete report;
  endif
endif
if (Interact with users) then (yes)
  :See users;
  if (Update user) then (yes)
    :Update user;
  elseif (Delete user) then (yes)
    :Delete user;
  endif
endif
if (Interact with accounts) then (yes)
  :See accounts;
  if (Update account) then (yes)
    :Update account;
  elseif (Delete account) then (yes)
    :Delete account;
  endif
endif
if (Interact with conversations) then (yes)
  :See conversations;
  if (Update conversation) then (yes)
    :Update conversation;
  elseif (Delete conversation) then (yes)
    :Delete conversation;
  endif
endif
if (Interact with chats) then (yes)
  :See chats;
  if (Update chat) then (yes)
    :Update chat;
  elseif (Delete chat) then (yes)
    :Delete chat;
 

 endif
endif
if (Interact with stores) then (yes)
  :See stores;
  if (Update store) then (yes)
    :Update store;
  elseif (Delete store) then (yes)
    :Delete store;
  endif
endif
if (Interact with products/services) then (yes)
  :See products/services;
  if (Update product/service) then (yes)
    :Update product/service;
  elseif (Delete product/service) then (yes)
    :Delete product/service;
  endif
endif
if (Interact with transactions) then (yes)
  :See transactions;
  if (Update transaction) then (yes)
    :Update transaction;
  elseif (Delete transaction) then (yes)
    :Delete transaction;
  endif
endif

stop
@enduml

```
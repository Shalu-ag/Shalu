public with sharing class AccountController {
    
    /**
     * Get all accounts with basic fields
     * * Get all accounts with basic fields
     * @return List<Account> List of accounts
     */
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts() {
        try {
            return [
                SELECT Id, Name, AccountNumber, Type, Industry, Phone, Website, 
                       Description, CreatedDate, LastModifiedDate
                FROM Account 
                ORDER BY Name ASC
                LIMIT 1000
            ];
        } catch (Exception e) {
            throw new AuraHandledException('Error retrieving accounts: ' + e.getMessage());
        }
    }
    
    /**
     * Create a new account
     * @param accountData JSON string containing account fields
     * @return Account The created account
     */
    @AuraEnabled
    public static Account createAccount(String accountData) {
        try {
            // Parse the JSON data
            Map<String, Object> fieldMap = (Map<String, Object>) JSON.deserializeUntyped(accountData);
            
            // Create new account object
            Account newAccount = new Account();
            
            // Set fields dynamically
            for (String fieldName : fieldMap.keySet()) {
                if (fieldName != 'Id' && fieldName != 'CreatedDate' && fieldName != 'LastModifiedDate') {
                    Object fieldValue = fieldMap.get(fieldName);
                    if (fieldValue != null) {
                        newAccount.put(fieldName, fieldValue);
                    }
                }
            }
            
            // Insert the account
            insert newAccount;
            
            // Return the created account with all fields
            return [
                SELECT Id, Name, AccountNumber, Type, Industry, Phone, Website, 
                       Description, CreatedDate, LastModifiedDate
                FROM Account 
                WHERE Id = :newAccount.Id
            ];
            
        } catch (Exception e) {
            throw new AuraHandledException('Error creating account: ' + e.getMessage());
        }
    }
    
    /**
     * Update an existing account
     * @param accountData JSON string containing account fields including Id
     * @return Account The updated account
     */
    @AuraEnabled
    public static Account updateAccount(String accountData) {
        try {
            // Parse the JSON data
            Map<String, Object> fieldMap = (Map<String, Object>) JSON.deserializeUntyped(accountData);
            
            // Get the account ID
            String accountId = (String) fieldMap.get('Id');
            if (String.isBlank(accountId)) {
                throw new AuraHandledException('Account ID is required for update operation');
            }
            
            // Query the existing account
            Account existingAccount = [
                SELECT Id, Name, AccountNumber, Type, Industry, Phone, Website, Description
                FROM Account 
                WHERE Id = :accountId
                LIMIT 1
            ];
            
            // Update fields dynamically
            for (String fieldName : fieldMap.keySet()) {
                if (fieldName != 'Id' && fieldName != 'CreatedDate' && fieldName != 'LastModifiedDate') {
                    Object fieldValue = fieldMap.get(fieldName);
                    if (fieldValue != null) {
                        existingAccount.put(fieldName, fieldValue);
                    }
                }
            }
            
            // Update the account
            update existingAccount;
            
            // Return the updated account with all fields
            return [
                SELECT Id, Name, AccountNumber, Type, Industry, Phone, Website, 
                       Description, CreatedDate, LastModifiedDate
                FROM Account 
                WHERE Id = :existingAccount.Id
            ];
            
        } catch (Exception e) {
            throw new AuraHandledException('Error updating account: ' + e.getMessage());
        }
    }
    
    /**
     * Delete an account
     * @param accountId The ID of the account to delete
     * @return Boolean True if deletion was successful
     */
    @AuraEnabled
    public static Boolean deleteAccount(Id accountId) {
        try {
            if (accountId == null) {
                throw new AuraHandledException('Account ID is required for delete operation');
            }
            
            // Query the account to check if it exists
            Account accountToDelete = [
                SELECT Id, Name 
                FROM Account 
                WHERE Id = :accountId
                LIMIT 1
            ];
            
            // Delete the account
            delete accountToDelete;
            
            return true;
            
        } catch (Exception e) {
            throw new AuraHandledException('Error deleting account: ' + e.getMessage());
        }
    }
    
    /**
     * Search accounts by name
     * @param searchTerm The search term to look for in account names
     * @return List<Account> List of matching accounts
     */
    @AuraEnabled(cacheable=true)
    public static List<Account> searchAccounts(String searchTerm) {
        try {
            if (String.isBlank(searchTerm)) {
                return getAccounts();
            }
            
            String searchPattern = '%' + searchTerm + '%';
            
            return [
                SELECT Id, Name, AccountNumber, Type, Industry, Phone, Website, 
                       Description, CreatedDate, LastModifiedDate
                FROM Account 
                WHERE Name LIKE :searchPattern
                ORDER BY Name ASC
                LIMIT 100
            ];
            
        } catch (Exception e) {
            throw new AuraHandledException('Error searching accounts: ' + e.getMessage());
        }
    }
    
    /**
     * Get account by ID
     * @param accountId The ID of the account to retrieve
     * @return Account The account record
     */
    @AuraEnabled(cacheable=true)
    public static Account getAccountById(Id accountId) {
        try {
            if (accountId == null) {
                throw new AuraHandledException('Account ID is required');
            }
            
            return [
                SELECT Id, Name, AccountNumber, Type, Industry, Phone, Website, 
                       Description, CreatedDate, LastModifiedDate
                FROM Account 
                WHERE Id = :accountId
                LIMIT 1
            ];
            
        } catch (Exception e) {
            throw new AuraHandledException('Error retrieving account: ' + e.getMessage());
        }
    }
}
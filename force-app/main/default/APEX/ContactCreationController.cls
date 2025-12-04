public with sharing class ContactCreationController {
    
    @AuraEnabled
    public static String createContact(String firstName, String lastName, String email, String phone, String accountId) {
        try {
            // Validate required fields
            if (String.isBlank(firstName) || String.isBlank(lastName)) {
                return 'Error: First Name and Last Name are required fields.';
            }
            
            // Create new contact
            // Create new contact
            Contact newContact = new Contact();
            newContact.FirstName = firstName;
            newContact.LastName = lastName;
            newContact.Email = email;
            newContact.Phone = phone;
            
            // Associate with account if provided
            if (String.isNotBlank(accountId)) {
                newContact.AccountId = accountId;
            }
            
            // Insert contact
            insert newContact;
            
            return 'Success: Contact created successfully with ID: ' + newContact.Id;
            
        } catch (DmlException e) {
            return 'Error: ' + e.getDmlMessage(0);
        } catch (Exception e) {
            return 'Error: ' + e.getMessage();
        }
    }
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts() {
        try {
            return [SELECT Id, Name FROM Account ORDER BY Name LIMIT 100];
        } catch (Exception e) {
            throw new AuraHandledException('Error retrieving accounts: ' + e.getMessage());
        }
    }
    
    @AuraEnabled
    public static List<Contact> getRecentContacts() {
        try {
            return [SELECT Id, FirstName, LastName, Email, Phone, Account.Name 
                   FROM Contact 
                   ORDER BY CreatedDate DESC 
                   LIMIT 10];
        } catch (Exception e) {
            throw new AuraHandledException('Error retrieving contacts: ' + e.getMessage());
        }
    }
}

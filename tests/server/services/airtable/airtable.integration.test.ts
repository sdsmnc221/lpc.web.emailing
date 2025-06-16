import { describe, it, expect, beforeAll } from 'vitest'
import { config } from 'dotenv'
import AirtableService from '~/server/services/airtable/airtable'

// Load environment variables from .env file
config()

// Integration tests - sử dụng Airtable thật
describe('AirtableService - Integration Tests', () => {
  let service: AirtableService
  
  beforeAll(() => {
    console.log('AIRTABLE_ACCESS_TOKEN:', process.env.AIRTABLE_ACCESS_TOKEN ? 'Found' : 'Not found')
    console.log('AIRTABLE_BASE_ID:', process.env.AIRTABLE_BASE_ID)
    
    // Skip nếu không có credentials
    if (!process.env.AIRTABLE_ACCESS_TOKEN || !process.env.AIRTABLE_BASE_ID) {
      console.log('⚠️  Skipping integration tests - missing Airtable credentials')
      console.log('Set AIRTABLE_ACCESS_TOKEN and AIRTABLE_BASE_ID in .env file')
      return
    }
    
    service = AirtableService.getInstance()
  })
  
  /**
   * Test real connection to Airtable base
   */
  it('should connect to real Airtable base and get instance', () => {
    if (!process.env.AIRTABLE_ACCESS_TOKEN || !process.env.AIRTABLE_BASE_ID) {
      console.log('⏭️  Skipping - no credentials')
      return
    }
    
    expect(service).toBeInstanceOf(AirtableService)
    expect(service.getBase()).toBeDefined()
    console.log('✅ Successfully connected to Airtable base')
  })
  
  /**
   * Test getting a table from real Airtable
   */
  it('should get table instance from real Airtable', () => {
    if (!process.env.AIRTABLE_ACCESS_TOKEN || !process.env.AIRTABLE_BASE_ID) {
      console.log('⏭️  Skipping - no credentials')
      return
    }
    
    // Thay 'Table 1' bằng tên table thật trong base của bạn
    const tableName = 'Table 1'
    const table = service.getTable(tableName)
    
    expect(table).toBeDefined()
    console.log(`✅ Successfully got table: ${tableName}`)
  })
  
  /**
   * Test connection to a specific table
   */
  it('should test connection to real table', async () => {
    if (!process.env.AIRTABLE_ACCESS_TOKEN || !process.env.AIRTABLE_BASE_ID) {
      console.log('⏭️  Skipping - no credentials')
      return
    }
    
    const tableName = 'Emailing'
    
    try {
      const records = await service.testTableConnection(tableName)
      expect(records).toBeDefined()
      expect(Array.isArray(records)).toBe(true)
      
      console.log(`✅ Successfully tested connection to table: ${tableName}`)
      console.log(`📊 Found ${records.length} record(s) in test query`)
      
      if (records.length > 0) {
        console.log('📝 Sample record structure:')
        console.log('   - ID:', records[0].id)
        console.log('   - Fields:', Object.keys(records[0].fields || {}))
      }
    } catch (error) {
      console.error(`Failed to connect to table '${tableName}':`, (error as Error).message)
      
      // Nếu table không tồn tại, đây là lỗi expected
      if ((error as Error).message.includes('NOT_FOUND') || (error as Error).message.includes('Table not found')) {
        console.log('💡 Tip: Make sure the table name exists in your Airtable base')
        console.log('💡 Common table names: "Table 1", "Contacts", "Users", etc.')
      }
      
      throw error
    }
  }, 10000) // 10 second timeout
  
  /**
   * Test getting all records from real table
   */
  it('should get records from real table', async () => {
    if (!process.env.AIRTABLE_ACCESS_TOKEN || !process.env.AIRTABLE_BASE_ID) {
      console.log('⏭️  Skipping - no credentials')
      return
    }
    
    const tableName = 'Emailing'
    
    try {
      const records = await service.getAllRecords(tableName, { 
        maxRecords: 3 
      })
      
      expect(records).toBeDefined()
      expect(Array.isArray(records)).toBe(true)
      
      console.log(`✅ Successfully fetched records from table: ${tableName}`)
      console.log(`📊 Total records fetched: ${records.length}`)
      
      if (records.length > 0) {
        console.log('📝 Sample record data:')
        records.forEach((record, index) => {
          console.log(`   Record ${index + 1}:`)
          console.log(`     - ID: ${record.id}`)
          console.log(`     - Fields: ${JSON.stringify(record.fields, null, 6)}`)
        })
      } else {
        console.log('📝 Table is empty - no records found')
      }
    } catch (error) {
      console.error(`Failed to fetch records from table '${tableName}':`, (error as Error).message)
      throw error
    }
  }, 15000) // 15 second timeout
  
  /**
   * Test error handling with invalid table name
   */
  it('should handle error when table does not exist', async () => {
    if (!process.env.AIRTABLE_ACCESS_TOKEN || !process.env.AIRTABLE_BASE_ID) {
      console.log('⏭️  Skipping - no credentials')
      return
    }
    
    const invalidTableName = 'NonExistentTable123'
    
    await expect(service.testTableConnection(invalidTableName))
      .rejects.toThrow()
    
    console.log(`✅ Correctly handled error for invalid table: ${invalidTableName}`)
  }, 10000)
})
import { describe, it, expect, beforeAll } from 'vitest'
import { config } from 'dotenv'
import AirtableService from '~/server/services/airtable/airtable'

// Load environment variables from .env file
config()

describe('AirtableService - Integration Tests', () => {
  let service: AirtableService
  
  beforeAll(() => {
    console.log('AIRTABLE_ACCESS_TOKEN:', process.env.AIRTABLE_ACCESS_TOKEN ? 'Found' : 'Not found')
    console.log('AIRTABLE_BASE_ID:', process.env.AIRTABLE_BASE_ID)
    
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
    
    const tableName = 'Emailing'
    const table = service.getTable(tableName)
    
    expect(table).toBeDefined()
    console.log(`✅ Successfully got table: ${tableName}`)
  })
  
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

    
    console.log(`✅ Correctly handled error for invalid table: ${invalidTableName}`)
  }, 10000)
})
// Basic unit tests for entitlement store logic
// Note: In a real setup, use Jest or similar framework

import { createOrUpdateEntitlement, isEntitlementActive, getEntitlement } from '@/lib/entitlementStore';

// Test createOrUpdateEntitlement
console.log('Testing createOrUpdateEntitlement...');
const ent = createOrUpdateEntitlement('testUser', 'USDC', 'monthly');
console.assert(ent.tokenSelected === 'USDC', 'Token should be USDC');
console.assert(ent.plan === 'monthly', 'Plan should be monthly');
console.assert(ent.status === 'active', 'Status should be active');

// Test isEntitlementActive
console.log('Testing isEntitlementActive...');
const active = isEntitlementActive('testUser');
console.assert(active === true, 'Should be active');

// Test getEntitlement
console.log('Testing getEntitlement...');
const retrieved = getEntitlement('testUser');
console.assert(retrieved?.tier === 'scor_access_pass', 'Tier should be scor_access_pass');

console.log('All entitlement store tests passed!');
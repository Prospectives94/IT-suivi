/**
 * SharePoint Sync Service — STUB (v2.0)
 * ======================================
 * Ce service sera activé lorsque vous aurez configuré une App Registration Azure AD.
 *
 * Pour activer la synchronisation SharePoint :
 * 1. Créer une App Registration dans Azure AD (portal.azure.com)
 * 2. Accorder les permissions : Sites.ReadWrite.All
 * 3. Remplir les variables dans server/.env :
 *    - SHAREPOINT_TENANT_ID
 *    - SHAREPOINT_CLIENT_ID
 *    - SHAREPOINT_CLIENT_SECRET
 *    - SHAREPOINT_SITE_URL
 *    - SHAREPOINT_LIST_NAME
 */

const isConfigured = () => {
  return (
    process.env.SHAREPOINT_TENANT_ID &&
    process.env.SHAREPOINT_CLIENT_ID &&
    process.env.SHAREPOINT_CLIENT_SECRET &&
    process.env.SHAREPOINT_SITE_URL
  );
};

// Stub : sync a ticket to SharePoint
const syncTicket = async (ticket) => {
  if (!isConfigured()) {
    // Silently skip - SharePoint not configured
    return;
  }
  // TODO v2.0 : Implement Microsoft Graph API sync
  // const { ClientSecretCredential } = require('@azure/identity');
  // const { Client } = require('@microsoft/microsoft-graph-client');
  console.log(`[SharePoint] Sync ticket #${ticket.id} — Non configuré, ignoré`);
};

module.exports = { syncTicket, isConfigured };

# Privacy Note

The QueueLess Backend is designed with a "Privacy First" mindset. We collect the minimum amount of data necessary to provide our services.

## Data Collection
- **Session IDs**: We generate unique, non-sequential UUIDs to track queue positions without identifying the user.
- **Phone Numbers**: Optional. Only collected if the user opts-in to SMS notifications. These are stored securely and not used for marketing purposes.
- **Queue Metadata**: We track queue numbers and timestamps to calculate wait times.

## Data Retention
- Queue entry data is stored until the queue session is concluded (Served, Cancelled, or Expired).
- Stale data is regularly pruned to minimize data footprint.

## Third-Party Data Sharing
- Phone numbers may be shared with SMS service providers (e.g., Twilio) solely for the purpose of delivering alerts.
- We do not sell or share user data with advertisers or trackers.

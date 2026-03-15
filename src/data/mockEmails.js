const mockEmails = [
  {
    id: 1,
    from: 'Sarah Chen',
    email: 'sarah.chen@company.com',
    subject: 'Q1 Marketing Report - Final Review',
    preview: 'Hi team, please find attached the final Q1 marketing report. Key highlights include a 23% increase in...',
    body: `Hi team,

Please find attached the final Q1 marketing report. Key highlights include:

• 23% increase in organic traffic
• Email open rates improved to 34.2%
• Social media engagement up 41% across all platforms
• Lead generation exceeded targets by 18%

The report includes detailed breakdowns by channel and recommendations for Q2. Please review and share any feedback by Friday.

Looking forward to discussing this at our Monday standup.

Best,
Sarah Chen
VP Marketing`,
    date: 'Mar 15',
    read: false,
    starred: false,
    avatar: 'SC',
    avatarColor: '#EA4335',
    labels: ['Work'],
  },
  {
    id: 2,
    from: 'GitHub',
    email: 'noreply@github.com',
    subject: '[aeromail] Pull Request #142: Feature/dark-mode',
    preview: 'mergify[bot] merged pull request #142 into main. 14 files changed, 892 additions, 234 deletions...',
    body: `mergify[bot] merged pull request #142 into main.

Feature/dark-mode
14 files changed, 892 additions(+), 234 deletions(-)

Commits:
• feat: add dark mode theme provider
• fix: contrast ratios for accessibility
• refactor: extract color tokens to theme.js
• test: add dark mode snapshot tests

View on GitHub: https://github.com/aeromail/aeromail/pull/142`,
    date: 'Mar 15',
    read: false,
    starred: true,
    avatar: 'GH',
    avatarColor: '#6e40c9',
    labels: ['Dev'],
  },
  {
    id: 3,
    from: 'Alex Rivera',
    email: 'alex.rivera@design.co',
    subject: 'Updated mockups for inbox redesign',
    preview: 'Hey! Just finished the updated mockups for the inbox redesign. I incorporated all the feedback from...',
    body: `Hey!

Just finished the updated mockups for the inbox redesign. I incorporated all the feedback from Tuesday's review:

1. Simplified the sidebar navigation
2. Added density toggle (comfortable/compact/default)
3. Reworked the thread view with better spacing
4. New compose window with formatting toolbar

Figma link: https://figma.com/file/mockup-link

Let me know what you think! Happy to jump on a call to walk through the changes.

Cheers,
Alex`,
    date: 'Mar 14',
    read: true,
    starred: false,
    avatar: 'AR',
    avatarColor: '#34A853',
    labels: [],
  },
  {
    id: 4,
    from: 'Stripe',
    email: 'receipts@stripe.com',
    subject: 'Your receipt from AeroMail Pro',
    preview: 'Payment of $29.00 to AeroMail Pro was successful. Receipt #1847-2938. Next billing date: April 15...',
    body: `Payment Confirmation

Amount: $29.00
To: AeroMail Pro - Business Plan
Receipt #: 1847-2938
Date: March 14, 2026

Card ending in: •••• 4242
Next billing date: April 15, 2026

View receipt: https://dashboard.stripe.com/receipts/1847-2938

Questions? Contact support@aeromail.com`,
    date: 'Mar 14',
    read: true,
    starred: false,
    avatar: 'ST',
    avatarColor: '#635BFF',
    labels: ['Finance'],
  },
  {
    id: 5,
    from: 'Maria Torres',
    email: 'maria@startup.io',
    subject: 'Coffee next week?',
    preview: "It's been a while! Would love to catch up over coffee. Are you free Tuesday or Wednesday afternoon?",
    body: `Hey!

It's been a while! Would love to catch up over coffee. Are you free Tuesday or Wednesday afternoon?

I've been meaning to tell you about this new project I'm working on - I think you'd find it really interesting. It's in the AI/productivity space.

Let me know what works for you. I'm flexible on location - happy to come to your side of town.

Talk soon!
Maria`,
    date: 'Mar 13',
    read: true,
    starred: true,
    avatar: 'MT',
    avatarColor: '#FBBC04',
    labels: ['Personal'],
  },
  {
    id: 6,
    from: 'Jira',
    email: 'jira@company.atlassian.net',
    subject: '[AERO-891] Bug: Email threads not loading on mobile',
    preview: 'Issue AERO-891 has been assigned to you. Priority: High. Reporter: QA Team. Environment: iOS 18.2...',
    body: `Issue: AERO-891
Type: Bug
Priority: High
Assignee: You
Reporter: QA Team

Summary: Email threads not loading on mobile

Description:
On iOS 18.2, tapping an email thread shows a blank white screen. The loading spinner appears for ~2 seconds then disappears with no content rendered.

Steps to Reproduce:
1. Open AeroMail on iPhone 15 Pro (iOS 18.2)
2. Navigate to Inbox
3. Tap any email thread with 3+ messages
4. Observe blank screen

Expected: Thread messages should load
Actual: Blank white screen after spinner

Environment: iOS 18.2, AeroMail v3.2.1 (build 847)`,
    date: 'Mar 13',
    read: false,
    starred: false,
    avatar: 'JI',
    avatarColor: '#0052CC',
    labels: ['Dev'],
  },
  {
    id: 7,
    from: 'LinkedIn',
    email: 'notifications@linkedin.com',
    subject: '5 people viewed your profile this week',
    preview: 'Your profile was viewed by recruiters from Google, Meta, and 3 others. See who viewed your profile...',
    body: `Your Weekly Profile Stats

5 people viewed your profile this week (+2 from last week)

Profile viewers include recruiters from:
• Google
• Meta
• 3 others

Your post "Building Email for the AI Age" received:
• 1,247 impressions
• 89 reactions
• 12 comments

Keep your profile updated to attract more opportunities.`,
    date: 'Mar 12',
    read: true,
    starred: false,
    avatar: 'LI',
    avatarColor: '#0A66C2',
    labels: ['Social'],
  },
  {
    id: 8,
    from: 'DevOps Alert',
    email: 'alerts@monitoring.aeromail.com',
    subject: '⚠️ CPU usage spike on mail-worker-03',
    preview: 'Alert: mail-worker-03 CPU usage exceeded 90% threshold at 03:42 UTC. Auto-scaling triggered...',
    body: `⚠️ Infrastructure Alert

Server: mail-worker-03
Metric: CPU Usage
Threshold: 90%
Current: 94.2%
Time: 03:42 UTC, March 12, 2026

Auto-scaling has been triggered:
• 2 additional instances spinning up
• ETA: ~3 minutes
• Current healthy instances: 5/7

Dashboard: https://monitoring.aeromail.com/dashboard/workers

This alert will auto-resolve when usage drops below 75%.`,
    date: 'Mar 12',
    read: true,
    starred: false,
    avatar: 'DO',
    avatarColor: '#EA4335',
    labels: ['Dev'],
  },
];

export const folders = [
  { name: 'Inbox', icon: 'Inbox', count: 3 },
  { name: 'Starred', icon: 'Star', count: 2 },
  { name: 'Snoozed', icon: 'AccessTime', count: 0 },
  { name: 'Sent', icon: 'Send', count: 0 },
  { name: 'Drafts', icon: 'Description', count: 1 },
  { name: 'Spam', icon: 'Report', count: 0 },
  { name: 'Trash', icon: 'Delete', count: 0 },
];

export const labels = [
  { name: 'Work', color: '#34A853' },
  { name: 'Personal', color: '#FBBC04' },
  { name: 'Dev', color: '#8ab4f8' },
  { name: 'Finance', color: '#EA4335' },
  { name: 'Social', color: '#A142F4' },
];

export default mockEmails;

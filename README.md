# Swipeable Profiles App

A professional React Native app for browsing user profiles with detailed achievement information.

## 🏗️ Project Structure

```
swipeable-profiles/
├── app/                          # Expo Router app directory
│   ├── (tabs)/                   # Tab navigation
│   │   └── index.tsx            # Main home screen
├── components/                   # Reusable UI components
│   ├── Card.tsx                 # Profile card component
│   ├── AchievementDetailsView.tsx # Achievement details display
│   ├── NavigationBar.tsx        # Bottom navigation
│   ├── LoadingView.tsx          # Loading and error states
│   └── index.ts                 # Component exports
├── constants/                   # App constants
│   └── badgeIcons.ts           # Badge icon mappings
├── src/                        # Source code
│   ├── hooks/                  # Custom React hooks
│   │   └── useProfiles.ts      # Profile data hook
│   └── repositories/           # Data layer
│       └── ProfileRepository.ts # YAML data loading
├── utils/                      # Utility functions
│   ├── dataLoader.ts           # Data loading utilities
│   └── gradeFetchers.ts        # Grade fetching logic
└── assets/                     # Static assets
    └── data/
        └── profiles.yaml       # Profile data
```

## 🚀 Features

- **Profile Browsing**: Navigate through user profiles with Previous/Next buttons
- **Achievement Details**: Tap badges to view detailed information
- **Rich Data Display**: Education, publications, YouTube channels, championships, projects, performances
- **Professional UI**: Clean, modern interface with proper loading states
- **TypeScript**: Fully typed for better development experience

## 🧩 Components

### Card
- Displays user profile with avatar and achievement badges
- Handles badge interactions and grade fetching
- Shows achievement details when badges are tapped

### AchievementDetailsView
- Scrollable view of achievement details
- Displays education, publications, YouTube channels, etc.
- Organized sections with emoji icons

### NavigationBar
- Bottom navigation with Previous/Next buttons
- Shows current position (e.g., "2 / 3")
- Clean, accessible design

### LoadingView
- Handles loading and error states
- Provides consistent user feedback

## 📊 Data Structure

Profiles are loaded from `assets/data/profiles.yaml` with the following structure:

```yaml
profiles:
  - id: '1'
    name: 'User Name'
    image: 'profile-image-url'
    achievements:
      - name: 'economy'
        grade: 7
        description: 'Achievement description'
        details:
          diploma: [...]
          publications: [...]
          youtube_channel: [...]
          championships: [...]
          projects: [...]
          performances: [...]
```

## 🛠️ Development

### Prerequisites
- Node.js
- Expo CLI
- React Native development environment

### Setup
1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm start`

### Key Technologies
- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and tools
- **TypeScript**: Type safety and better DX
- **YAML**: Data storage format
- **React Hooks**: State management

## 🎨 Design Principles

- **Component Separation**: Each component has a single responsibility
- **Type Safety**: Full TypeScript coverage
- **Clean Architecture**: Separation of concerns between UI, data, and business logic
- **Reusability**: Components are designed to be reusable
- **Accessibility**: Proper touch targets and navigation

## 📱 Usage

1. **Browse Profiles**: Use Previous/Next buttons to navigate
2. **View Details**: Tap on achievement badges (⭐🏆🍃🔥💎)
3. **Scroll Content**: Scroll through detailed achievement information
4. **Navigate**: Use bottom navigation for profile switching

This app demonstrates professional React Native development practices with clean architecture, proper component separation, and a maintainable codebase.

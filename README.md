# 🐱 Cat Voting Platform

A modern, interactive web application for voting on adorable cat images. Built with React, TypeScript, and Tailwind CSS, featuring a beautiful UI with dark/light theme support and local vote storage.

🌐 **[Live Demo](https://689a77d4c619e0856d706dc9--precious-truffle-00b0f7.netlify.app/)**

## ✨ Features

- **Cat Image Gallery**: Browse and vote on cat images from TheCatAPI
- **Voting System**: Upvote/downvote cats with real-time score tracking
- **Tabbed Interface**: Switch between "All Cats" and "Voted Cats" views
- **Theme Toggle**: Seamless dark/light mode switching
- **Responsive Design**: Mobile-first design with smooth animations
- **Local Storage**: Votes and preferences stored locally in your browser
- **Offline Support**: Basic offline functionality with network status detection

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**

### Try the App First

🌐 **[View Live Demo](https://689a77d4c619e0856d706dc9--precious-truffle-00b0f7.netlify.app/)**

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd cat-voting-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file from template
   cp .env.example .env
   
   # Or create .env file manually
   echo "VITE_CAT_API_KEY=your_api_key_here" > .env
   ```
   
   Edit `.env` and add your TheCatAPI key:
   ```env
   VITE_CAT_API_KEY=your_actual_api_key_from_thecatapi
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔧 Environment Configuration

### Required Environment Variables

Create a `.env` file in the root directory:

```env
# TheCatAPI Configuration
VITE_CAT_API_KEY=your_api_key_here

# Optional: API Base URL (defaults to TheCatAPI)
VITE_CAT_API_BASE_URL=https://api.thecatapi.com/v1

# Optional: Number of images to fetch (defaults to 10)
VITE_IMAGES_LIMIT=10

# Optional: Enable debug logging (defaults to false)
VITE_DEBUG=false
```

### Getting Your API Key

1. Visit [TheCatAPI](https://thecatapi.com/)
2. Sign up for a free account
3. Generate an API key
4. Add it to your `.env` file

## 📜 Available Scripts

### Development
```bash
# Start development server with hot reload
npm run dev

# Start development server with specific port
npm run dev -- --port 3000

# Start development server with host binding
npm run dev -- --host

# Start development server with HTTPS (for testing)
npm run dev -- --https
```

### Building
```bash
# Build for production
npm run build

# Preview production build locally
npm run preview

# Build with bundle analysis
npm run build:analyze
```

### Testing
```bash
# Run tests in watch mode
npm test

# Run tests once
npm run test:ci

# Run tests with coverage
npm run test:coverage

# Run tests in specific file
npm test -- CatCard.test.tsx
```

### Code Quality
```bash
# Run ESLint
npm run lint

# Fix ESLint issues automatically
npm run lint:fix

# Run TypeScript type checking
npm run type-check

# Format code with Prettier
npm run format
```

### Utilities
```bash
# Clean build artifacts
npm run clean

# Install dependencies with clean slate
npm run reinstall
```

## 🏗️ Project Structure

```
cat-voting-app/
├── src/
│   ├── components/          # React components
│   │   ├── CatCard.tsx     # Individual cat voting card
│   │   ├── CatGallery.tsx  # Main gallery with tabs
│   │   ├── ThemeToggle.tsx # Theme switcher
│   │   └── Toast.tsx       # Notification component
│   ├── hooks/              # Custom React hooks
│   │   ├── useTheme.ts     # Theme management
│   │   └── useNetworkStatus.ts # Network status
│   ├── services/           # API services
│   │   └── catApi.ts       # TheCatAPI integration (with env var support)
│   ├── store/              # State management
│   │   └── index.ts        # Zustand store
│   ├── utils/              # Utility functions
│   │   └── userId.ts       # User identification
│   └── __tests__/          # Test files
├── public/                 # Static assets
├── .env                    # Environment variables (create this)
├── .env.example           # Environment template
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
├── vite.config.ts         # Vite build configuration
└── tsconfig.json          # TypeScript configuration
```

## 🧪 Testing

The project includes comprehensive test coverage using Jest and React Testing Library:

- **Unit Tests**: Component behavior and logic
- **Integration Tests**: User interactions and workflows
- **Mock Strategy**: Isolated testing with mocked dependencies

### Test Coverage

- **CatCard**: 100% coverage - Voting interactions, loading states, accessibility
- **CatGallery**: 91.42% coverage - Tab switching, image loading, error handling
- **ThemeToggle**: 100% coverage - Theme switching functionality
- **useTheme**: 100% coverage - Theme management hook

### Test Improvements Made

- ✅ **Fixed React warnings** by properly handling async state updates
- ✅ **Enhanced test reliability** with proper async/await patterns
- ✅ **Improved test coverage** for loading states and error handling

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage report
npm run test:coverage

# Run tests in watch mode (development)
npm test -- --watch

# Run specific test file
npm test -- CatCard.test.tsx
```

## 🎨 Styling

The app uses **Tailwind CSS** for styling with:

- **Custom Theme System**: Dark/light mode with CSS variables
- **Responsive Design**: Mobile-first approach
- **Smooth Animations**: CSS transitions and transforms
- **Component Variants**: Consistent button and card styles
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Performance**: Optimized CSS with PurgeCSS for production builds

### Theme Colors

```css
/* Light Theme */
--color-primary: #3b82f6
--color-secondary: #6b7280
--color-background: #ffffff
--color-surface: #f9fafb

/* Dark Theme */
--color-primary: #60a5fa
--color-secondary: #9ca3af
--color-background: #111827
--color-surface: #1f2937
```

## 🔌 API Integration

### TheCatAPI Endpoints

- **Random Images**: `GET /images/search?limit={limit}`
- **Image Details**: `GET /images/{id}`
- **Breeds**: `GET /breeds` (for future features)

### Security & Configuration

- **API Key Management**: Securely stored in environment variables
- **No Hardcoded Keys**: API keys are read from `.env` file at runtime
- **Validation**: Automatic warning if API key is missing
- **Rate Limiting**: Free tier allows 10,000 requests/month

### Environment Variable Usage

The app automatically reads your TheCatAPI key from the `VITE_CAT_API_KEY` environment variable and includes it in the `x-api-key` header for all API requests.

## 🚀 Deployment

### Build for Production

```bash
# Create optimized build
npm run build

# Preview build locally
npm run preview
```

### Deployment Options

- **Netlify**: ✅ **Currently deployed** - [Live Demo](https://689a77d4c619e0856d706dc9--precious-truffle-00b0f7.netlify.app/)
- **Vercel**: Zero-config deployment
- **GitHub Pages**: Free hosting for public repos
- **AWS S3**: Static site hosting

### Environment Variables in Production

Remember to set your environment variables in your hosting platform:
- `VITE_CAT_API_KEY`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write tests for new features
- Use conventional commit messages
- Ensure responsive design compatibility
- Test in both light and dark themes

## 📱 Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

## 🐛 Troubleshooting

### Common Issues

**API Key Not Working**
- Verify your API key is correct and active
- Check if you've exceeded rate limits (10,000/month free)
- Ensure the key is in your `.env` file (not `.env.example`)
- Restart your development server after adding the API key
- Check browser console for API key validation warnings

**Images Not Loading**
- Check network connectivity
- Verify API key configuration in `.env` file
- Check browser console for errors
- Ensure your `.env` file is in the project root directory

**Theme Not Persisting**
- Clear browser cache
- Check localStorage permissions
- Verify browser supports localStorage

**Tests Failing**
- Run `npm run reinstall` to clean dependencies
- Check Node.js version compatibility
- Clear Jest cache: `npm test -- --clearCache`
- Ensure all environment variables are properly set

### Debug Mode

Enable debug logging by setting in your `.env`:
```env
VITE_DEBUG=true
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **TheCatAPI** for providing cat images
- **React Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Vite** for the fast build tool
- **Zustand** for lightweight state management

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Include your environment details and error messages

---

**Happy Cat Voting! 🐱❤️**

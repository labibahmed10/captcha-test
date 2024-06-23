# React Captcha Webcam Validation

This project implements a unique captcha validation system using React and webcam functionality. Users are required to take a selfie and then identify specific shapes and colors within the captured image to pass the captcha.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (version 12.0 or higher recommended)
- npm (usually comes with Node.js)
- A modern web browser with webcam support

## Installation

To install the project, follow these steps:

1. Clone the repository: https://github.com/labibahmed10/captcha-test.git
2. Navigate to the project directory: `cd captcha-test/`
3. Install the dependencies: `npm install`

## Usage

To run the project locally:

1. Start the development server: `npm run dev`
2. Open your web browser and navigate to `http://localhost:3000`
3. Allow camera access when prompted by your browser
4. Follow the on-screen instructions to complete the captcha

## Key Features

1. `Webcam Integration:` Uses react-webcam for selfie capture.
2. `Dynamic Captcha Generation:` Creates a grid with random shapes and colors.
3. `Interactive Selection:` Allows users to click on grid sectors.
4. `Validation System:` Checks user selections against the generated captcha.
5. `Multiple Attempts:` Tracks and limits failed validation attempts.
6. `Temporary Blocking:` Implements a blocking mechanism after multiple failures.

## Components

- `CaptchaContainer`: Wrapper component for the captcha interface
- `CaptchaWebCamContainer`: Handles webcam integration and image capture
- `CaptchaSectorsValidation`: Manages the captcha validation process
- `BlockedError`: Displays when user is blocked after 5 failed attempts

## The main components of the project are:

### App.tsx

The main component that orchestrates the captcha flow. It manages the state and logic for:

- Capturing the selfie
- Generating the captcha grid
- Validating user selections
- Handling failed attempts and user blocking

### CaptchaContainer.tsx

A wrapper component that provides a consistent layout for different stages of the captcha process. It displays:

- The captcha title
- The main content (webcam or captcha grid)
- Action button
- Feedback messages

### CaptchaSectorsValidation.tsx

Handles the display and interaction of the captcha grid after a selfie is taken. Features include:

- Displaying the captured selfie
- Overlaying an interactive grid
- Rendering shape watermarks (triangle, circle, square)
- Handling user selections

### CaptchaWebCamContainer.tsx

Manages the webcam functionality for capturing the selfie. It:

- Initializes the webcam
- Displays the live webcam feed
- Shows a positioning guide for the captcha grid

## Styling

The project uses a combination of Tailwind CSS and custom styles. Key styling features include:

- Responsive design with flexbox
- Custom shapes for captcha watermarks
- Interactive hover and active states
- Dynamic positioning of the captcha grid

# How It Works

1. User is prompted to take a selfie.
2. A grid is overlaid on the captured image.
3. Random grid sectors are filled with colored shapes.
4. User is instructed to select sectors with a specific shape and color.
5. Selections are validated, and feedback is provided.
6. After multiple failed attempts, the user is temporarily blocked for one hour

## Dependencies

- React
- typescript
- react-webcam
- Tailwind CSS
- sweetalert2

# QuestionPro React Application

This project is a React evaluation application containing two distinct and independent features:
1. A **Todo List** built around data visualization, server-state caching, and complex filtering.
2. A **Dynamic Form Builder** allowing rapid form prototyping with multiple input types and real-time live preview.

## 🚀 Setup Instructions

1. **Prerequisites**
   Ensure you have Node.js installed (v18+ recommended).

2. **Installation**
   Open your terminal, navigate to the project root, and install the dependencies:
   ```bash
   npm install
   ```

3. **Start the Development Server**
   ```bash
   npm run dev
   ```
   The application will become available at `http://localhost:5173/`. 

4. **Production Build (Optional)**
   ```bash
   npm run build
   ```

---

## 🏗️ Explanation of Approach

When engineering this application, the primary goal was to demonstrate competency in modern React paradigms rather than legacy approaches. Below are the key architectural decisions and approaches I took:

### 1. Modern React & React Router Architecture
- **React 19 & Router v7:** The application leverages the latest APIs. I opted to use the new native form actions (`useActionState` and `<form action={...}>`) for form submissions instead of capturing synthetic events and parsing data manually. I also utilized `createBrowserRouter` to establish a clean Single Page Application (SPA) layout utilizing an `Outlet` root frame.
- **Custom Hooks for Separation of Concerns:** Business/Domain logic was decoupled from UI rendering. Functions fetching and normalizing data live in `src/hooks/useTodos.js`. Functions driving array manipulations and layout swapping for the dynamic form live entirely in `src/hooks/useFormConfig.js`. 

### 2. State Management Strategy
I opted for a hybrid state management architecture matching the specific type of state being handled:
- **Server State (TanStack Query):** The Todo feature relies on `JSONPlaceholder`. Instead of using `useEffect` chains (which are prone to race conditions), I integrated `@tanstack/react-query`. This automatically caches API responses, deduplicates requests, and gracefully handles `isLoading` and `isError` lifecycle states. If you navigate away from `/todos` and come back, it reads instantly from the cache (`staleTime: Infinity`) saving a network round trip.
- **Client Application State (Context API):** For application-wide variables such as User and Status filtering in the Todo list, I wrapped the list in a React Context Provider (`FilterContext.js`). This avoids prop-drilling allowing deeply nested components to communicate filter changes seamlessly. 

### 3. Emphasizing User Experience (UX) & Aesthetics
Rather than building a "minimum viable product", I emphasized a premium look and feel.
- **Split-Pane Form Builder:** Instead of forcing the user to build a form on one page and blindly switch routes to preview it, I implemented a robust split-pane drag-and-drop layout. You build on the left, while the right side updates the true rendered form in real-time. (Note: the standalone `/form-preview` route is heavily supported as well for external sharing contexts).
- **CSS Modules:** Styling is built from scratch utilizing purely vanilla CSS Modules with standardized design tokens (CSS variables defined in `index.css`). This offers highly maintainable styles that automatically avoid global class-name collisions.

### 4. Third-Party Integrations
- **Axios:** Initially built with `fetch`, I refactored the HTTP infrastructure to utilize `axios` (`src/api/todoApi.js`) to provide robust, configurable asynchronous API handling.
- **React-Paginate:** To avoid fragile custom pagination logic regarding ellipses boundaries mid-navigation, I swapped standard array slicing methods for `react-paginate`. By styling the library precisely to our CSS Module class mappings, we achieved enterprise-grade pagination rendering.

### 5. Persistence
State loss on browser refresh presents a massive friction point. I wrote sync mechanisms using `localStorage` for multiple facets of the application:
- **Form Config Backup**: Changing a form dropdown option instantly streams that change to local storage, allowing the user to refresh or browse away and resume exactly where they left off.
- **Filter Retention**: Searching and User filtering states stick with you through refresh utilizing `localStorage` bootstrapped inside the Context API tree.

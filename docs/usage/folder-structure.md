# Folder Structure

Learn the folder structure of `fika-gg-web` repository.

## Table of Contents

- [Naming conventions](#naming-convention)
- [Group by Feature](#group-by-feature)
- [Overview](#overview)

## Naming convention

- Folder names are written in camel case `camelCase/`.
- `.ts` files are written in camel case `camelCase.ts`.
- `.tsx` files are written in Pascal case `PascalCase.tsx`.

## Group by Feature

Do _NOT_ group code by their type or functionality.

```
// ❌ THIS IS WRONG
📁app/
├📁api/
│ ├#️⃣authService.ts
│ └#️⃣gameService.ts
└📁components/
	├📁auth/
	│ ├#️⃣LoginForm.tsx
	│ ├#️⃣LogoutButton.tsx
	│ └#️⃣RegisterForm.tsx
	└📁game/
		├#️⃣AddGame.tsx
		├#️⃣UpdateGame.tsx
		└#️⃣RemoveGame.tsx
```

Group them instead by their relationship with other code, also known as feature. Grouping them this way is known as **Feature Sliced Design**.

```
// ✅ THIS IS CORRECT
📁app/
├📁auth/
│ ├📁api/
│ │ └#️⃣authService.ts
│ └📁components/
│ 	├#️⃣LoginForm.tsx
│ 	├#️⃣LogoutButton.tsx
│ 	└#️⃣RegisterForm.tsx
└📁game/
```

## Overview

`fika-gg-web` have the following folders.

- `📁fika-gg-web/` root folder
    - `📁github/` ci/cd (.yml files for devops)
    - `📁docs/` documentation files
    - `📁src/`
        - [`📁app/`](#app) client app config, routing, providers, authentication
        - [`📁pages/`](#pages) web pages
        - [`📁features/`](#features) components and functions grouped by feature
        - [`📁shared/`](#shared) reusable utilities

> Remeber to update [Overview](#overview) whenever folders are added or removed!

---

## `app/`

This folder contain components and related types, functions, variables, etc... that can _only_ be used in the `App.tsx` file.

```tsx
function App() {
	return (
		<AuthProvider>
			<ThemeProvider>
				<AppRouter />
			</ThemeProvider>
		</AuthProvider>
	);
}
```

These files **must** be grouped together by feature.

```
📁app/
├📁auth/
│ ├#️⃣AuthContext.tsx
│ ├#️⃣authContextType.ts
│ ├#️⃣AuthProvider.tsx
│ └#️⃣useAuth.ts
├📁router/
│ ├#️⃣AppRouter.tsx
│ └#️⃣ProtectedRoute.tsx
└📁theme/
  ├#️⃣ThemeContext.tsx
  └#️⃣ThemeProvider.tsx
```

## `pages/`

Place all components that represents a web page here.

## `features/`

Place and group any functions and components that are exclusive to a feature in here. Remember to separate them into `api/` for function files and `components/` for component files.

This example below shows that we have grouped all components and functions that allows users to register, login and logout, into a a **auth** feature folder.

```
📁app/
└📁auth/
  ├📁api/
	│ └#️⃣authService.ts
	└📁components/
  	├#️⃣LoginForm.tsx
  	├#️⃣LogoutButton.tsx
  	└#️⃣RegisterForm.tsx
```

## `shared/`

Any generic code that is shared for the whole project should be placed in this folder.

> **NOTE!** Generic means it can be used in every folder without problems.
> If an component can only be used with a specific feature, then it is probably not a generic component.

These might include

- components such as buttons, lists, inputs, etc...
- helper or utility functions that can be imported into multiple folders.

---

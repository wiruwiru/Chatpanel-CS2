# ChatPanel [CS2]

Welcome to **ChatPanel**! This web project is designed to help staff members review chat logs and access user information. The project works exclusively with the **SimpleAdmin** fork made by Cruze.

> [!CAUTION]  
> If you were using version **v1.1.2** or earlier, you **must** remove any database tables with the `chatpanel_` prefix before updating to version **v1.1.3** or higher. This is because newer versions use a significantly different schema for their tables.

---

## ✨ Features

- **Message Logs:** View messages sent by users on your game server.
- **User Information:** Access vital details including:
  - **SteamID**
  - **IP Address**
  - **Last Connection**
  - **Previous** and **active sanctions**
- **Advanced Filters:** Quickly search for users by:
  - SteamID
  - IP Address
  - Name
  - Message Content
- **Server & Team Filters:** Narrow your search by specific server or team.
- **Multilingual Support**: Fully translated interface available in **Spanish**, **English**, and **Portuguese**.
---

## 🖼️ Previews

### 🏠 Home
![Home](https://github.com/user-attachments/assets/fa01e6fb-604d-4e02-b3d7-3cc896f0f557)

### 📊 Admin Panel / Dashboard
![Dashboard](https://github.com/user-attachments/assets/712d9f2c-be7a-4150-914f-933c4cd57c7c)

### ⚙️ Configuración
![Configuratión](https://github.com/user-attachments/assets/e34a97a9-5489-424b-92c5-f3e9561f2625)
![Permissions](https://github.com/user-attachments/assets/4936ed69-9a96-46a6-b1d9-2ec931dc177a)

### 💬 ChatLogs
![ChatLogs](https://github.com/user-attachments/assets/da679b41-5c15-4c07-9003-39f60c9335c1)

### 🧑‍💻 User Chatlog
![User Chatlog](https://github.com/user-attachments/assets/c46d8e0f-3594-4584-b074-ae682a3e9432)

### 🔍 Player Search
![PlayerSearch](https://github.com/user-attachments/assets/ce6cfe24-e8d0-411c-b092-ad8d23af93dd)

### 📈 Statistics
![Statistics](https://github.com/user-attachments/assets/fdfe343e-1517-459c-b528-dc2284426133)
![Admin-Statistics](https://github.com/user-attachments/assets/c6e918ec-1726-47c7-880b-419bcec69b8b)

---

## 🔧 Requirements

To use this project, ensure you meet the following requirements:

- A Counter-Strike 2 server with:
  - [CounterStrike Sharp](https://github.com/roflmuffin/CounterStrikeSharp) installed.
  - [Metamod:Source](https://www.sourcemm.net/downloads.php/?branch=master) installed.
  - [SimpleAdmin](https://github.com/Cruze03/CS2-SimpleAdmin) by daffyyyy (fork Cruze) installed.
- The same database used by **SimpleAdmin** must be configured.
- A hosting environment that supports **Node.js** execution.

---

## ⚙️ Setup

1. Copy the `.env.example` file to `.env` and fill in the required information:
   - **STEAM_API_KEY**: Obtain from [Steam API](https://steamcommunity.com/dev/apikey).
   - **SESSION_SECRET**: Generate a secure random string with the following command:
     ```bash 
     node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
     ```
     Alternatively, you can use an online generator like [random.org](https://www.random.org/strings/) or any cryptography tool.
   - **BASE_URL**: Set this to your project's domain or localhost URL. For example:
     - If you're running the project locally, set it to `http://localhost:3000`.
     - If the project is deployed on a server, set it to your domain, such as `https://yourdomain.com`.
   - **FACEIT_API_KEY**: Obtain your API key from [Faceit Developers](https://developers.faceit.com). **Optional**

2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

3. Start the project:
   ```bash
   npm run start
   ```

---

## TO-DO
| Task                                               | Status     | Priority   | Description                                                                                              |
|----------------------------------------------------|------------|------------|----------------------------------------------------------------------------------------------------------|
| Independent Plugin for Logging Messages and Statistics | Pending    | High       | Develop a standalone plugin to log messages and store statistics in the database. |
| General Style Improvements | Pending | Medium | Improve the overall design and styling of the project. |
| Fix known bugs     | Pending    | Medium       | Fix html errors caused by multi-lang.               |
| Improve Documentation and Installation     | Pending    | Medium       | Enhance the project documentation and streamline the installation process, including support for hosting on EasyPanel.               |
| Improve Permission System | **Complete** | High | Enhance the permission system to allow controlled access to different project features, such as message logging and statistics. |
| Fetch Server IDs Automatically     | **Complete**    | High       | Obtain server IDs automatically from the configured database (sa_servers).               |
| Fix Header Language Bug            | **Complete** | High | Resolve language selection not displaying properly in headers. |
| More Stadistics                    | **Complete**    | Medium       | Add "Hours Played," and "Number of Messages Sent".               |
| Statistics Page with Graph and Filters             | **Complete**    | Medium       | Show a graph with player activity and the ability to filter by administrators.   |
| Multilingual Support               | **Complete**    | Low       | Implement the ability to switch between languages such as English, Spanish, or Portuguese.               |

---

## 🔒 Build-Only Distribution

The codebase for this project is private, and only the compiled build is shared. 

- **Ideas & Reports:** Please submit issues for any ideas, suggestions, or bug reports.
- **Contributions:** This project does not accept external contributions.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

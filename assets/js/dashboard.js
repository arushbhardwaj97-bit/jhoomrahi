/**
 * JhoomRahi — Dashboard, Chat & Community Logic
 * Phase 5 Foundation
 * 
 * Provides reactive data binding and event handlers for:
 * 1. Post-login Dashboard hub (Personalized stats, 3 pillars, near-you recommendations)
 * 2. In-App Chat (WhatsApp/Instagram style inbox + thread, PII regex blocker, Masked Call)
 * 3. Community Hub (College/City social feed, group join toggles, post interactions)
 */

/* ========================================================================= */
/* 1. SECURE PII REGEX PATTERNS & RED WARNING TOAST                          */
/* ========================================================================= */

// Catches 10-digit Indian numbers with or without +91 / 0, spaces, dashes, or dots
const PII_PHONE_REGEX = /(?:(?:\+|0{0,2})91[\s.-]*)?[6-9]\d{2}[\s.-]*\d{3}[\s.-]*\d{4}\b|\b[6-9]\d{9}\b|\b\d{5}[\s.-]+\d{5}\b/g;

/**
 * Checks if input text contains an Indian mobile number or external contact pattern
 * @param {string} text 
 * @returns {boolean}
 */
function containsPhonePII(text) {
  if (!text) return false;
  // Reset lastIndex for stateful global regex
  PII_PHONE_REGEX.lastIndex = 0;
  return PII_PHONE_REGEX.test(text.trim());
}

/**
 * Displays a high-contrast RED warning toast for safety / PII violations
 * @param {string} message 
 */
function showRedWarningToast(message = "⚠️ Number share not allowed for security reasons!") {
  let toastContainer = document.getElementById("toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "toast-container";
    toastContainer.className = "fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none";
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement("div");
  toast.className = "toast show pointer-events-auto flex items-start gap-3 bg-rose-50 dark:bg-rose-950/90 border-2 border-rose-500/60 text-rose-900 dark:text-rose-100 px-4 py-3 rounded-2xl shadow-2xl text-sm font-semibold transition-all duration-300 max-w-md animate-shake";
  
  toast.innerHTML = `
    <div class="w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
    </div>
    <div class="flex-1">
      <p class="font-bold text-rose-700 dark:text-rose-300 leading-tight">Safety & Privacy Shield</p>
      <p class="text-xs text-rose-800 dark:text-rose-200 mt-0.5 leading-relaxed">${message}</p>
    </div>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove("show");
    toast.classList.add("opacity-0", "translate-y-4");
    setTimeout(() => toast.remove(), 350);
  }, 4500);
}

/**
 * Triggers simulated Masked Call with secure bridge notification
 * @param {string} contactName 
 */
function triggerMaskedCallBridge(contactName = "User") {
  if (typeof showToast === "function") {
    showToast(`Connecting securely to ${contactName} via JhoomRahi Masked Bridge... (No numbers exchanged)`, "success");
  }
}


/* ========================================================================= */
/* 2. DASHBOARD PAGE CONTROLLER                                              */
/* ========================================================================= */

function dashboardApp() {
  return {
    currentUser: {
      name: "Rohan Deshmukh",
      handle: "@rohan_dev",
      role: "SDE-1 @ Swiggy",
      city: "Bengaluru",
      avatar: "https://picsum.photos/seed/rohan_dev/200/200",
      verified: true,
      profileCompletion: 92
    },
    streakDays: 3,
    coinBalance: 120,
    greeting: "",
    timeOfDayIcon: "sun",
    stats: {
      activeInquiries: 3,
      tripsJoined: 2,
      communitiesJoined: 3,
      savedListings: 5
    },
    recentChats: [],
    nearYouStay: null,
    nearYouTrip: null,
    nearYouSpot: null,
    communityHighlights: [],

    showStreakToast() {
      if (typeof showToast === "function") {
        showToast("Come back tomorrow to keep your streak alive and earn 50 coins! 🔥", "warning");
      }
    },

    showCoinsToast() {
      if (typeof showToast === "function") {
        showToast("You have 120 JhoomCoins! Redeem for rent discounts & travel perks 🪙", "info");
      }
    },

    async init() {
      this.calculateGreeting();
      await this.loadDashboardData();
      if (window.lucide) window.lucide.createIcons();
    },

    calculateGreeting() {
      const hr = new Date().getHours();
      if (hr < 12) {
        this.greeting = "Good morning";
        this.timeOfDayIcon = "sun";
      } else if (hr < 17) {
        this.greeting = "Good afternoon";
        this.timeOfDayIcon = "sun";
      } else {
        this.greeting = "Good evening";
        this.timeOfDayIcon = "moon";
      }
    },

    async loadDashboardData() {
      try {
        // Load recent chats
        if (typeof getChats === "function") {
          const chats = await getChats();
          this.recentChats = chats.slice(0, 3);
        }

        // Load Near You listings (Bengaluru focus)
        if (typeof FEATURED_PGS !== "undefined" && FEATURED_PGS.length) {
          this.nearYouStay = FEATURED_PGS.find(p => p.city === "Bengaluru") || FEATURED_PGS[0];
        }

        if (typeof UPCOMING_TRIPS !== "undefined" && UPCOMING_TRIPS.length) {
          this.nearYouTrip = UPCOMING_TRIPS[0];
        }

        if (typeof PLACES !== "undefined" && PLACES.length) {
          this.nearYouSpot = PLACES.find(p => p.city === "Bengaluru" && p.category === "food") || PLACES[0];
        }

        // Load community highlights
        if (typeof getCommunities === "function") {
          const comms = await getCommunities();
          this.communityHighlights = comms.slice(0, 3);
        }
      } catch (err) {
        console.error("Error loading dashboard data:", err);
      }
    }
  };
}


/* ========================================================================= */
/* 3. IN-APP CHAT CONTROLLER                                                 */
/* ========================================================================= */

function chatApp() {
  return {
    chats: [],
    activeChatId: "chat-01",
    activeChat: null,
    searchQuery: "",
    activeFilter: "all", // 'all' | 'unread' | 'stay' | 'travel'
    messageInput: "",
    mobileView: "inbox", // 'inbox' | 'thread'
    isTypingReply: false,
    showMaskedCallModal: false,
    inputShake: false,

    // Phase 6 Message Actions state
    activeActionMenuMsgId: null,
    editingMessageId: null,
    editingOriginalText: "",
    longPressTimer: null,

    // Phase 6 Media & Emoji Picker state
    showMediaPicker: false,
    activePickerTab: "emojis", // 'emojis' | 'stickers' | 'gifs'

    // Phase 6 Retention metrics
    streakDays: 3,
    coinBalance: 120,

    // Curated standard unicode emojis
    emojiList: [
      "😀", "😂", "🤣", "😍", "😎", "🥳", "🤔", "🙌", "👍", "🔥",
      "✨", "🎉", "💯", "🏠", "🧳", "☕", "🍕", "🛵", "⛺", "🚆",
      "💡", "📍", "🤝", "💪", "💼", "🚀", "❤️", "🙏", "🤩", "🍻",
      "🏖️", "🏔️", "🚗", "🍜", "🏸", "🎧"
    ],

    // Curated high-energy student / flatmate stickers
    stickerList: [
      { id: "st-1", name: "Zero Brokerage", emoji: "🏠", tag: "VERIFIED", bg: "from-indigo-500 to-indigo-700", text: "Zero Brokerage 🏠" },
      { id: "st-2", name: "Chai Pe Charcha", emoji: "☕", tag: "MEETUP", bg: "from-amber-500 to-amber-700", text: "Chai Pe Charcha ☕" },
      { id: "st-3", name: "Spiti Squad", emoji: "🏔️", tag: "TRAVEL", bg: "from-cyan-500 to-blue-700", text: "Spiti Squad 🏔️" },
      { id: "st-4", name: "Midnight Maggi", emoji: "🍜", tag: "HOSTEL LIFE", bg: "from-rose-500 to-red-600", text: "Midnight Maggi 🍜" },
      { id: "st-5", name: "Roommate Match", emoji: "👯", tag: "100% MATCH", bg: "from-emerald-500 to-emerald-700", text: "Roommate Match 👯" },
      { id: "st-6", name: "Deal Locked!", emoji: "🤝", tag: "CONFIRMED", bg: "from-purple-500 to-indigo-700", text: "Deal Locked! 🤝" }
    ],

    // Curated student & travel loops (GIFs)
    gifList: [
      { id: "gif-1", title: "Pack Your Bags", url: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&auto=format&fit=crop&q=80", tag: "Travel Time 🎒" },
      { id: "gif-2", title: "Chai Break", url: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&auto=format&fit=crop&q=80", tag: "Chai Break ☕" },
      { id: "gif-3", title: "Squad High-Five", url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&auto=format&fit=crop&q=80", tag: "Squad Vibes 🙌" },
      { id: "gif-4", title: "Flat Celebration", url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&auto=format&fit=crop&q=80", tag: "Flat Tour 🗝️" }
    ],

    async init() {
      // Check URL search params for pre-selected chat
      const urlParams = new URLSearchParams(window.location.search);
      const preselectId = urlParams.get("id");

      await this.loadChats();

      if (preselectId && this.chats.some(c => c.id === preselectId)) {
        this.selectChat(preselectId);
      } else if (this.chats.length > 0) {
        this.selectChat(this.chats[0].id);
      }

      // Responsive screen size listener for mobile / desktop sync
      window.addEventListener("resize", () => {
        if (window.innerWidth >= 768) {
          // Desktop always displays thread alongside inbox
          this.mobileView = "thread";
        }
      });

      if (window.innerWidth >= 768) {
        this.mobileView = "thread";
      }

      if (window.lucide) window.lucide.createIcons();
    },

    async loadChats() {
      try {
        if (typeof getChats === "function") {
          this.chats = await getChats();
        } else if (typeof CHATS !== "undefined") {
          this.chats = JSON.parse(JSON.stringify(CHATS));
        }
      } catch (err) {
        console.error("Error loading chats:", err);
      }
    },

    get filteredChats() {
      let list = this.chats || [];

      // Filter tabs
      if (this.activeFilter === "unread") {
        list = list.filter(c => c.unread > 0);
      } else if (this.activeFilter === "stay") {
        list = list.filter(c => (c.contextTag && c.contextTag.toLowerCase().includes("stay")));
      } else if (this.activeFilter === "travel") {
        list = list.filter(c => (c.contextTag && (c.contextTag.toLowerCase().includes("travel") || c.contextTag.toLowerCase().includes("trip"))));
      }

      // Substring search across name, role, lastMessage
      if (this.searchQuery && this.searchQuery.trim()) {
        const q = this.searchQuery.toLowerCase().trim();
        list = list.filter(c =>
          c.name.toLowerCase().includes(q) ||
          (c.role && c.role.toLowerCase().includes(q)) ||
          (c.lastMessage && c.lastMessage.toLowerCase().includes(q))
        );
      }

      return list;
    },

    selectChat(id) {
      this.activeChatId = id;
      const found = this.chats.find(c => c.id === id);
      if (found) {
        this.activeChat = found;
        found.unread = 0; // mark as read
      }
      this.mobileView = "thread";
      this.scrollToBottom();

      setTimeout(() => {
        if (window.lucide) window.lucide.createIcons();
      }, 50);
    },

    backToInbox() {
      this.mobileView = "inbox";
    },

    scrollToBottom() {
      this.$nextTick(() => {
        const container = document.getElementById("chat-messages-container");
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      });
    },

    showStreakToast() {
      if (typeof showToast === "function") {
        showToast("Come back tomorrow to keep your streak alive and earn 50 coins! 🔥", "warning");
      }
    },

    showCoinsToast() {
      if (typeof showToast === "function") {
        showToast("You have 120 JhoomCoins! Redeem for rent discounts & travel perks 🪙", "info");
      }
    },

    triggerReferralShare() {
      if (typeof confetti === "function") {
        confetti({
          particleCount: 75,
          spread: 70,
          origin: { y: 0.65 },
          colors: ["#6366f1", "#a3e635", "#fb7185", "#f59e0b"]
        });
      }
      const referralUrl = "https://jhoomrahi.com/join?ref=ROHAN100";
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(referralUrl).catch(() => {});
      }
      if (typeof showToast === "function") {
        showToast("Referral link copied! Share with friends to earn 100 Coins each 🪙", "success");
      }
    },

    openActionMenu(msgId) {
      this.activeActionMenuMsgId = msgId;
    },

    closeActionMenu() {
      this.activeActionMenuMsgId = null;
    },

    handleTouchStart(msg) {
      if (!msg || msg.sender !== "me" || msg.deletedForEveryone) return;
      if (this.longPressTimer) clearTimeout(this.longPressTimer);
      this.longPressTimer = setTimeout(() => {
        this.openActionMenu(msg.id);
      }, 450);
    },

    handleTouchEnd() {
      if (this.longPressTimer) {
        clearTimeout(this.longPressTimer);
        this.longPressTimer = null;
      }
    },

    startEditMessage(msg) {
      if (!msg || msg.sender !== "me" || msg.deletedForEveryone) return;
      this.editingMessageId = msg.id;
      this.editingOriginalText = msg.text;
      this.messageInput = msg.text;
      this.closeActionMenu();
      this.showMediaPicker = false;
      this.$nextTick(() => {
        const input = document.getElementById("chat-message-input");
        if (input) input.focus();
      });
    },

    cancelEditMessage() {
      this.editingMessageId = null;
      this.editingOriginalText = "";
      this.messageInput = "";
    },

    async saveEditMessage() {
      const text = this.messageInput ? this.messageInput.trim() : "";
      if (!text || !this.activeChat || !this.editingMessageId) return;

      // STRICT PII CHECK on edit
      if (containsPhonePII(text)) {
        this.inputShake = true;
        setTimeout(() => {
          this.inputShake = false;
        }, 500);
        showRedWarningToast("⚠️ Number share not allowed! For safety and scam protection, phone numbers cannot be added via edit.");
        return;
      }

      const msg = this.activeChat.messages.find(m => m.id === this.editingMessageId);
      if (msg) {
        msg.text = text;
        msg.isEdited = true;
        const visibleMsgs = this.activeChat.messages.filter(m => !m.deletedForMe);
        if (visibleMsgs.length && visibleMsgs[visibleMsgs.length - 1].id === msg.id) {
          this.activeChat.lastMessage = text;
        }
        this.saveChatsToStorage();
        if (typeof showToast === "function") {
          showToast("Message updated! (edited)", "success");
        }
      }

      this.editingMessageId = null;
      this.editingOriginalText = "";
      this.messageInput = "";
      this.scrollToBottom();
    },

    deleteMessageForMe(msgId) {
      if (!this.activeChat) return;
      const msg = this.activeChat.messages.find(m => m.id === msgId);
      if (msg) {
        msg.deletedForMe = true;
        this.closeActionMenu();
        const visibleMsgs = this.activeChat.messages.filter(m => !m.deletedForMe);
        if (visibleMsgs.length) {
          const last = visibleMsgs[visibleMsgs.length - 1];
          this.activeChat.lastMessage = last.text;
        }
        this.saveChatsToStorage();
        if (typeof showToast === "function") {
          showToast("Message deleted for you", "info");
        }
      }
    },

    deleteMessageForEveryone(msgId) {
      if (!this.activeChat) return;
      const msg = this.activeChat.messages.find(m => m.id === msgId);
      if (msg) {
        msg.deletedForEveryone = true;
        msg.text = "🚫 This message was deleted";
        msg.type = "text";
        this.closeActionMenu();
        const visibleMsgs = this.activeChat.messages.filter(m => !m.deletedForMe);
        if (visibleMsgs.length && visibleMsgs[visibleMsgs.length - 1].id === msg.id) {
          this.activeChat.lastMessage = "🚫 This message was deleted";
        }
        this.saveChatsToStorage();
        if (typeof showToast === "function") {
          showToast("Message deleted for everyone", "info");
        }
      }
    },

    toggleMediaPicker() {
      this.showMediaPicker = !this.showMediaPicker;
    },

    selectEmoji(emoji) {
      this.messageInput += emoji;
      const input = document.getElementById("chat-message-input");
      if (input) input.focus();
    },

    sendSticker(sticker) {
      if (!this.activeChat) return;
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", hour12: true });

      const stickerMsg = {
        id: "msg-" + Date.now(),
        sender: "me",
        type: "sticker",
        sticker: sticker,
        text: sticker.text,
        time: timeStr,
        status: "sent"
      };

      this.activeChat.messages.push(stickerMsg);
      this.activeChat.lastMessage = `[Sticker: ${sticker.name}]`;
      this.activeChat.time = "Just now";
      this.showMediaPicker = false;
      this.saveChatsToStorage();
      this.scrollToBottom();
      this.simulateIncomingReply();
    },

    sendGif(gif) {
      if (!this.activeChat) return;
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", hour12: true });

      const gifMsg = {
        id: "msg-" + Date.now(),
        sender: "me",
        type: "gif",
        gif: gif,
        text: `[GIF: ${gif.title}]`,
        time: timeStr,
        status: "sent"
      };

      this.activeChat.messages.push(gifMsg);
      this.activeChat.lastMessage = `[GIF: ${gif.title}]`;
      this.activeChat.time = "Just now";
      this.showMediaPicker = false;
      this.saveChatsToStorage();
      this.scrollToBottom();
      this.simulateIncomingReply();
    },

    saveChatsToStorage() {
      try {
        if (typeof setStoredChats === "function") {
          setStoredChats(this.chats);
        } else {
          localStorage.setItem("jhoomrahi_chats", JSON.stringify(this.chats));
        }
      } catch (err) {
        // fallback
      }
    },

    /**
     * Sends message with strict PII blocking check
     */
    async handleSendMessage() {
      // If currently editing, route to saveEditMessage
      if (this.editingMessageId) {
        await this.saveEditMessage();
        return;
      }

      const text = this.messageInput ? this.messageInput.trim() : "";
      if (!text || !this.activeChat) return;

      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", hour12: true });

      // STRICT PII CHECK: If message contains a phone number
      if (containsPhonePII(text)) {
        // 1. Clear input immediately
        this.messageInput = "";

        // 2. Shake the input box
        this.inputShake = true;
        setTimeout(() => {
          this.inputShake = false;
        }, 500);

        // 3. Show high-contrast Red Warning Toast
        showRedWarningToast("⚠️ Number share not allowed! For safety and scam protection, phone numbers are masked. Please use Masked Call.");

        // 4. DO NOT send message or append any bubble to chat history
        return;
      }

      // Normal safe message
      const myMessage = {
        id: "msg-" + Date.now(),
        sender: "me",
        text: text,
        time: timeStr,
        status: "sent"
      };

      this.activeChat.messages.push(myMessage);
      this.activeChat.lastMessage = text;
      this.activeChat.time = "Just now";
      this.messageInput = "";
      this.saveChatsToStorage();

      if (typeof sendChatMessage === "function") {
        await sendChatMessage(this.activeChat.id, myMessage);
      }

      this.scrollToBottom();

      // Simulated realistic auto-reply from contact
      this.simulateIncomingReply();
    },

    simulateIncomingReply() {
      if (this.isTypingReply) return;
      this.isTypingReply = true;

      const activeId = this.activeChat.id;

      setTimeout(async () => {
        this.isTypingReply = false;
        if (!this.activeChat || this.activeChat.id !== activeId) return;

        const replies = [
          "Got it! That sounds completely fair.",
          "Awesome, let's lock this in. Looking forward to it!",
          "Great! I am free to discuss this further over Masked Call whenever convenient.",
          "Perfect. I'll update the group and share the details right here.",
          "Noted! Appreciate the quick response."
        ];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];

        const now = new Date();
        const timeStr = now.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", hour12: true });

        const incomingMsg = {
          id: "msg-reply-" + Date.now(),
          sender: "them",
          text: randomReply,
          time: timeStr,
          status: "delivered"
        };

        this.activeChat.messages.push(incomingMsg);
        this.activeChat.lastMessage = randomReply;
        this.activeChat.time = "Just now";
        this.saveChatsToStorage();

        if (typeof sendChatMessage === "function") {
          await sendChatMessage(this.activeChat.id, incomingMsg);
        }

        this.scrollToBottom();
      }, 1600);
    },

    triggerMaskedCall() {
      if (!this.activeChat) return;
      this.showMaskedCallModal = true;
      triggerMaskedCallBridge(this.activeChat.name);
    },

    closeMaskedCallModal() {
      this.showMaskedCallModal = false;
    }
  };
}


/* ========================================================================= */
/* 4. COMMUNITY PAGE CONTROLLER                                              */
/* ========================================================================= */

function communityApp() {
  return {
    communities: [],
    activeCommunityId: "comm-mnit",
    activeCommunity: null,
    activeTab: "all", // 'all' | 'joined' | 'campus' | 'city'
    searchQuery: "",
    newPostContent: "",
    newPostTag: "#Update",
    isSubmittingPost: false,

    async init() {
      await this.loadCommunities();
      if (this.communities.length > 0) {
        this.selectCommunity(this.communities[0].id);
      }
      if (window.lucide) window.lucide.createIcons();
    },

    async loadCommunities() {
      try {
        if (typeof getCommunities === "function") {
          this.communities = await getCommunities();
        } else if (typeof COMMUNITIES !== "undefined") {
          this.communities = JSON.parse(JSON.stringify(COMMUNITIES));
        }
      } catch (err) {
        console.error("Error loading communities:", err);
      }
    },

    get filteredCommunities() {
      let list = this.communities || [];

      if (this.activeTab === "joined") {
        list = list.filter(c => c.isJoined);
      } else if (this.activeTab === "campus") {
        list = list.filter(c => c.category === "Campus Tribe");
      } else if (this.activeTab === "city") {
        list = list.filter(c => c.category === "City Chapter" || c.category === "Housing Network");
      }

      if (this.searchQuery && this.searchQuery.trim()) {
        const q = this.searchQuery.toLowerCase().trim();
        list = list.filter(c =>
          c.name.toLowerCase().includes(q) ||
          c.city.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q)
        );
      }

      return list;
    },

    selectCommunity(id) {
      this.activeCommunityId = id;
      this.activeCommunity = this.communities.find(c => c.id === id) || null;
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => {
        if (window.lucide) window.lucide.createIcons();
      }, 50);
    },

    async toggleMembership(comm) {
      if (!comm) return;
      comm.isJoined = !comm.isJoined;
      comm.members = comm.isJoined ? comm.members + 1 : Math.max(0, comm.members - 1);
      comm.membersDisplay = `${(comm.members / 1000).toFixed(1)}k members`;

      if (typeof toggleCommunityJoin === "function") {
        await toggleCommunityJoin(comm.id);
      }

      if (typeof showToast === "function") {
        if (comm.isJoined) {
          showToast(`Welcome! You joined ${comm.name} 🎉`, "success");
        } else {
          showToast(`You left ${comm.name}`, "info");
        }
      }
    },

    async submitPost() {
      const content = this.newPostContent ? this.newPostContent.trim() : "";
      if (!content || !this.activeCommunity) return;

      this.isSubmittingPost = true;

      // PII check in community posts
      if (containsPhonePII(content)) {
        this.isSubmittingPost = false;
        showRedWarningToast("⚠️ Phone numbers cannot be posted publicly in community feeds. Use masked in-app chat!");
        return;
      }

      const newPost = {
        id: "post-" + Date.now(),
        author: {
          name: "Rohan Deshmukh",
          role: "SDE-1 @ Swiggy",
          avatar: "https://picsum.photos/seed/rohan_dev/200/200",
          verified: true
        },
        timeAgo: "Just now",
        content: content,
        likes: 1,
        isLiked: true,
        commentsCount: 0,
        tags: [this.newPostTag || "#Community"]
      };

      if (!this.activeCommunity.posts) {
        this.activeCommunity.posts = [];
      }
      this.activeCommunity.posts.unshift(newPost);

      if (typeof createCommunityPost === "function") {
        await createCommunityPost(this.activeCommunity.id, newPost);
      }

      this.newPostContent = "";
      this.isSubmittingPost = false;

      if (typeof confetti === "function") {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      }

      if (typeof showToast === "function") {
        showToast("Post shared with community feed!", "success");
      }
    },

    togglePostLike(post) {
      if (!post) return;
      post.isLiked = !post.isLiked;
      post.likes = post.isLiked ? post.likes + 1 : Math.max(0, post.likes - 1);
    }
  };
}


/* ========================================================================= */
/* 5. ROUTE UNBLOCKER FOR PHASE 5 PAGES                                      */
/* ========================================================================= */
// Ensures clicking dashboard, chat, or community links anywhere in the app never triggers placeholder toasts
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.querySelectorAll('a[href*="dashboard.html"], a[href*="chat.html"], a[href*="community.html"]').forEach((link) => {
      const clone = link.cloneNode(true);
      if (link.parentNode) {
        link.parentNode.replaceChild(clone, link);
      }
    });
  }, 10);
});

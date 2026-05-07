// ---------- WEBSOCKET ----------
function connectWebSocket() {
  try {
    ws = new WebSocket(WS_URL);

    ws.onopen = () => console.log('WebSocket подключён');

    ws.onmessage = async (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'event_update') {
        const targetUserId = activeUserIds.length > 0 ? activeUserIds[0] : (currentUser ? currentUser.id : null);
        if (targetUserId) {
          await loadEventsForUser(targetUserId);
          await loadAllFriendsEventsCount();
          refreshFutureCache();
          await renderCalendar();
          if (document.getElementById('eventModal').classList.contains('active')) renderModalEvents();
        }
      }
    };

    ws.onerror = (error) => console.error('WebSocket ошибка:', error);

    ws.onclose = () => {
      console.log('WebSocket отключён, переподключение через 5 сек...');
      setTimeout(connectWebSocket, 5000);
    };
  } catch (error) {
    console.error('Ошибка подключения WebSocket:', error);
  }
}
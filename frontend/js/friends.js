// ---------- УПРАВЛЕНИЕ ДРУЗЬЯМИ ----------
function getFriendColor(userId) {
  const colors = ['#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#06b6d4', '#f97316'];
  const index = (userId * 7) % colors.length;
  return colors[index];
}

async function toggleFriend(userId) {
  const index = activeUserIds.indexOf(userId);

  if (index > -1) {
    activeUserIds.splice(index, 1);
  } else {
    activeUserIds.push(userId);
  }

  if (activeUserIds.length > 0) {
    await loadEventsForSelectedUsers();
  } else {
    await loadEventsForUser(currentUser ? currentUser.id : null);
  }

  refreshFutureCache();
  await renderCalendar();
  updateActiveFriendDisplay();

  if (document.getElementById('eventModal').classList.contains('active')) {
    openModal(currentModalDate);
  }
}

async function selectFriend(userId) {
  activeUserIds = [userId];
  await loadEventsForSelectedUsers();
  refreshFutureCache();
  await renderCalendar();
  updateActiveFriendDisplay();

  if (document.getElementById('eventModal').classList.contains('active')) {
    openModal(currentModalDate);
  }
}

async function deselectAllFriends() {
  activeUserIds = [];
  await loadEventsForUser(currentUser ? currentUser.id : null);
  refreshFutureCache();
  await renderCalendar();
  updateActiveFriendDisplay();

  if (document.getElementById('eventModal').classList.contains('active')) {
    openModal(currentModalDate);
  }
}

function updateActiveFriendDisplay() {
  const info = document.getElementById('activeFriendInfo');
  const name = document.getElementById('activeFriendName');

  if (activeUserIds.length > 0) {
    const friendNames = activeUserIds.map(id => {
      const friend = users.find(u => u.id === id);
      return friend ? `${friend.first_name} ${friend.last_name}` : '';
    }).filter(Boolean);

    info.style.display = 'block';
    name.textContent = friendNames.join(', ');
  } else {
    info.style.display = 'none';
  }
}

async function renderFriendsList() {
  const list = document.getElementById('friendsList');

  if (!users || users.length === 0 || !currentUser) {
    list.innerHTML = '<div style="text-align:center;color:#94a3b8;padding:1rem;">Нет других пользователей</div>';
    return;
  }

  let filteredUsers = users.filter(u => u.id !== currentUser.id);
  filteredUsers = filterFriendsBySearch(filteredUsers);

  if (filteredUsers.length === 0) {
    list.innerHTML = '<div style="text-align:center;color:#94a3b8;padding:1rem;">Друзья не найдены</div>';
    return;
  }

  list.innerHTML = '';

  for (const user of filteredUsers) {
    const isActive = activeUserIds.includes(user.id);
    const eventsCount = getFriendEventsCount(user.id);
    const color = getFriendColor(user.id);

    const div = document.createElement('div');
    div.className = 'friend-item' + (isActive ? ' active' : '');
    div.innerHTML = `
      <div class="friend-info">
        <span class="friend-color" style="background-color: ${color}"></span>
        <span class="friend-name">${escapeHtml(user.first_name)} ${escapeHtml(user.last_name)}</span>
        <span class="friend-events-count">${eventsCount} событий</span>
      </div>
      ${isActive ? '<span style="font-size:0.8rem;">✅</span>' : ''}
    `;

    div.addEventListener('click', () => toggleFriend(user.id));
    list.appendChild(div);
  }

  updateSearchStats();
}

function updateFriendSelect() {
  const select = document.getElementById('modalFriendSelect');
  const currentValue = select.value;

  select.innerHTML = '<option value="me">Я</option>';

  if (users && users.length > 0 && currentUser) {
    let filteredUsers = users.filter(u => u.id !== currentUser.id);

    if (typeof filterFriendsBySearch === 'function') {
      filteredUsers = filterFriendsBySearch(filteredUsers);
    }

    filteredUsers.forEach(user => {
      const option = document.createElement('option');
      option.value = user.id;
      option.textContent = `${user.first_name} ${user.last_name}`;
      select.appendChild(option);
    });
  }

  if (currentValue && (currentValue === 'me' || (users && users.find(u => u.id == currentValue)))) {
    select.value = currentValue;
  }
}
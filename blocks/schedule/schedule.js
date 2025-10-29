/**
 * Get ordinal suffix for a day (1st, 2nd, 3rd, etc.)
 */
function getOrdinalSuffix(day) {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}

/**
 * Format date as "29th September"
 */
function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleDateString('en-GB', { month: 'long' });
  return `${day}${getOrdinalSuffix(day)} ${month}`;
}

/**
 * Format time string to show only hours and minutes (HH:MM)
 */
function formatTime(timeString) {
  // Handle format like "10:00:00" or just "10:00"
  const parts = timeString.trim().split(':');
  if (parts.length >= 2) {
    return `${parts[0]}:${parts[1]}`;
  }
  return timeString;
}

/**
 * Add day toggle functionality to day entries
 * @param {} block
 */
function addDayToggle(block) {
  // Add expand/collapse functionality to day entries
  const dayEntries = block.querySelectorAll('.day-entry');
  dayEntries.forEach((dayEntry) => {
    // Create toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'day-toggle';
    toggleBtn.setAttribute('aria-label', 'Toggle day visibility');
    toggleBtn.innerHTML = '<span class="toggle-icon"></span>';

    // Find the content div (the one with actual content)
    const titleParagraph = dayEntry.querySelector('p:first-child');
    titleParagraph.appendChild(toggleBtn);

    // Find all entries until the next day or end
    const entriesToToggle = [];
    let nextSibling = dayEntry.nextElementSibling;
    while (nextSibling && !nextSibling.classList.contains('day-entry')) {
      entriesToToggle.push(nextSibling);
      nextSibling = nextSibling.nextElementSibling;
    }

    // Toggle handler
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = dayEntry.classList.contains('expanded');

      if (isExpanded) {
        dayEntry.classList.remove('expanded');
        entriesToToggle.forEach((entry) => {
          entry.style.display = 'none';
        });
      } else {
        dayEntry.classList.add('expanded');
        entriesToToggle.forEach((entry) => {
          entry.style.display = 'flex';
        });
      }
    });

    // Start expanded by default
    dayEntry.classList.add('expanded');
  });
}

export default function decorate(block) {
  // Get the schedule header elements (title, description, start/ end)
  const children = Array.from(block.children);
  const header = children.slice(0, 3);
  // get the schedule entries
  const entries = children.slice(3);
  // third header element is start and end date
  const dateDiv = header[2];
  const dateParagraphs = dateDiv?.querySelectorAll('p');

  if (dateParagraphs && dateParagraphs.length >= 1) {
    const startText = dateParagraphs[0].textContent.trim();
    if (startText) {
      dateParagraphs[0].textContent = formatDate(startText);
    }
    if (dateParagraphs.length >= 2) {
      const endText = dateParagraphs[1].textContent.trim();
      if (endText) {
        dateParagraphs[1].textContent = formatDate(endText);
      }
    }
  }

  // Process each entry
  entries.forEach((entry) => {
    const [classesCell, timesCell, , speakersCell] = Array.from(entry.children);

    // -- Handle classes cell
    const classesEntries = classesCell?.textContent.split(',').map((e) => e.trim());
    // block item name (e.g. session, break, day, venue) is the first entry
    const blockItemName = classesEntries[0].toLowerCase();
    // + classes
    const blockItemClasses = classesEntries.slice(1);
    // Add classes to the entry
    entry.classList.add(...blockItemClasses);
    // no need for the classes cell anymore
    classesCell.remove();

    // -- handle times cell
    if (blockItemName === 'break' || blockItemName === 'session') {
      const timeParagraphs = timesCell.querySelectorAll('p');
      timeParagraphs.forEach((p) => {
        const timeText = p.textContent.trim();
        p.textContent = formatTime(timeText);
      });
    } else {
      // for day and venue entries, we dont need the time cell
      timesCell.remove();
    }

    // -- handle speakers cell
    if (blockItemName === 'session') {
      // Get all children and split by <hr> elements
      const speakersHTML = speakersCell.innerHTML;
      let speakerSections = speakersHTML.split('<hr>').filter((section) => section.trim());
      // remove first and last entry
      if (speakerSections.length > 2) {
        speakerSections = speakerSections.slice(1, -1);
      }
      // Clear the speakers cell
      speakersCell.innerHTML = '';

      // Process each speaker section
      speakerSections.forEach((speakerHTML) => {
        // Create speaker container with flexbox layout
        const speakerDiv = document.createElement('div');
        speakerDiv.className = 'speaker';
        // Create image cell
        const imageCell = document.createElement('div');
        imageCell.className = 'speaker-image';
        // Create info cell for the rest of the content
        const infoCell = document.createElement('div');
        infoCell.className = 'speaker-info';

        // Create a temporary container to parse the HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = speakerHTML;
        // Find the image element
        const pictureElement = tempDiv.querySelector('picture');

        // add picture element to image cell
        if (pictureElement) {
          imageCell.appendChild(pictureElement);
        }

        // replace single link (turned into button)
        const singleLink = tempDiv.querySelector('a.button');
        let linksList;
        if (singleLink) {
          singleLink.classList.remove('button');
          // remove parent p
          singleLink.parentElement.remove();
          // put a in a list
          linksList = document.createElement('ul');
          const listItem = document.createElement('li');
          linksList.appendChild(listItem);
          listItem.appendChild(singleLink);
        }

        // Move all remaining elements (except the picture) to info cell
        Array.from(tempDiv.children).forEach((child) => {
          if (child.tagName !== 'PICTURE' && child.tagName !== 'A') {
            infoCell.appendChild(child.cloneNode(true));
          }
        });

        if (linksList) infoCell.appendChild(linksList);

        // Append cells to speaker div
        speakerDiv.appendChild(imageCell);
        speakerDiv.appendChild(infoCell);

        // Add speaker div to speakers cell
        speakersCell.appendChild(speakerDiv);
      });
    } else {
      speakersCell.remove();
    }
  });

  addDayToggle(block);
}

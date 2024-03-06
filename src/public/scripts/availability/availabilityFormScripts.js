var selectedSlots = [];
var lastSelection = null;
var dayToggledMap = new Map();

window.onload = (event) => {
    if(editing) 
        selectedSlots = embeddedAvailability;
};

function onClickSaveHours (event, element) {
    element.disabled = true;

    const data = JSON.stringify({
        availability: selectedSlots
    });

    const xhr = new XMLHttpRequest();
    xhr.open('POST', `/availability/${year}/${week}`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    
    // Event listener for when the request completes.
    xhr.onload = function() {
        if (xhr.status === 201) {
            window.location.href = `/availability/${year}/${week}`;
        }
        else {
            const text = xhr.responseText;
            const alert = createAlert("alertPlaceholder");
            alert(text, 'danger')
            element.disabled = false;
        }
    };
    
    // Event listener for when an error occurs.
    xhr.onerror = function() {
        console.error('An error occurred while submitting the form.');
        const alert = createAlert("alertPlaceholder");
        alert("Something went wrong. Please try again later.", 'danger')
        element.disabled = false;
    };
    
    // Send the request with data.
    xhr.send(data);
}

function onClickTimeSlot (event, element) {
    const data = JSON.parse(element.dataset.slot);
    const day = data.day;
    const index = element.dataset.index;
    const alreadySelected = isSlotSelected(day, index);

    const multiSelect = event.shiftKey && lastSelection.day == day;

    if(multiSelect) {
        const min = Math.min(index, lastSelection.index);
        const max = Math.max(index, lastSelection.index);
        toggleMultipleSlots(day, min, max, lastSelection.selected);
        lastSelection = {
            day: day,
            index: index,
            selected: lastSelection.selected
        };
    } else {
        if(alreadySelected) {
            deSelectSlot(element, day, index);
        } else {
            selectSlot(element, day, index);
        }
        lastSelection = {
            day: day,
            index: index,
            selected: !alreadySelected
        };
    }
}

function toggleMultipleSlots (day, from, to, selected) {
    console.log(`From ${from} to ${to}`);
    for(let i = from; i <= to; i++) {
        const element = document.querySelector(`[id^="slot-day-${day}-index-${i}"]`);
        const data = JSON.parse(element.dataset.slot);
        const index = element.dataset.index;
        if(selected)
            selectSlot(element, data.day, index);
        else
            deSelectSlot(element, data.day, index);
    }
}

function isSlotSelected (day, index) {
    return selectedSlots.some(function(item) {
        return item.day === day && item.index === index;
    });
}

function selectSlot (element, day, index) {
    selectedSlots.push({
        day: day,
        index: index
    });
    element.classList.add("selected");
}

function deSelectSlot (element, day, index) {
    selectedSlots = selectedSlots.filter(function(item) {
        return !(item.day === day && item.index === index);
    });
    element.classList.remove("selected");
}

function onClickDay (element) {
    const day = element.dataset.day;
    toggleDay(day);
}

function toggleDay (day) {
    const elementsForDay = document.querySelectorAll(`[id^="slot-day-${day}-index-"]`);
    const toggleOn = !isDayToggledOn(day);
    elementsForDay.forEach(function(element) {
        const data = JSON.parse(element.dataset.slot);
        const index = element.dataset.index;
        if(toggleOn) {
            selectSlot(element, data.day, index);
        } else {
            deSelectSlot(element, data.day, index);
        }
    });
    dayToggledMap.set(day, toggleOn);
}

function isDayToggledOn(day) {
    if (dayToggledMap.has(day)) {
        return dayToggledMap.get(day);
    } else {
        return false;
    }
}
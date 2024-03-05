var selectedSlots = [];
var lastSelection = null;
var lastSelectionIndex = 0;
var lastSelectionActivated = false;
var dayToggledMap = new Map();

function onClickSaveHours (event, element) {
    // element.disabled = true;

    console.log(selectedSlots);
}

function onClickTimeSlot (event, element) {
    const data = JSON.parse(element.dataset.slot);
    const index = element.dataset.index;
    const multiSelect = event.shiftKey && lastSelection != null && lastSelection.day == data.day;

    if(multiSelect) {
        const min = Math.min(index, lastSelectionIndex);
        const max = Math.max(index, lastSelectionIndex);
        multiSelectSlots(data.day, min, max, slotAlreadySelected(lastSelection.day, lastSelectionIndex));
    } else {
        if(!slotAlreadySelected(data.day, index))
        {
            selectSlot(element, data, index);
            lastSelectionActivated = true;
        }
        else
        {
            deSelectSlot(element, data, index);
            lastSelectionActivated = false;
        }
        lastSelection = data;
        lastSelectionIndex = index;
    }
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
        if(toggleOn) {
            selectSlot(element, data);
        } else {
            deSelectSlot(element, data);
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

function slotAlreadySelected (day, index) {
    if(selectedSlots.find(s => s.day == day && s.index == index) != undefined)
        return true;
    return false;
}

function multiSelectSlots (day, from, to, toggle) {
    for(let i = from; i <= to; i++) {
        const element = document.querySelector(`[id^="slot-day-${day}-index-${i}"]`);
        const data = JSON.parse(element.dataset.slot);
        if(toggle)
            selectSlot(element, data);
        else
            deSelectSlot(element, data);
    }
}

function selectSlot (element, slot, index) {
    selectedSlots.push({
        day: slot.day,
        index: index
    });
    element.classList.add("selected");
}

function deSelectSlot (element, slot, index) {
    selectedSlots = selectedSlots.filter(function(item) {
        return !(item.day === slot.day && item.index === index);
    });
    element.classList.remove("selected");
}
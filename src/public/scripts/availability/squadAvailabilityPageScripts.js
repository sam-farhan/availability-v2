function onInputUser (event, element) {
    const checkBoxes = document.getElementsByTagName("input");
    var selectedUserIds = [];
    for (let i = 0; i < checkBoxes.length; i++) {
        const checkBox = checkBoxes[i];
        if(checkBox.checked) {
            selectedUserIds.push(checkBox.getAttribute("data-user"));
        }
    }
    clearHighlighting();
    if(selectedUserIds.length > 0 && embeddedAvailability.length > 0)
        setHighlightedSlots(selectedUserIds);
}

function setHighlightedSlots (selectedUserIds) {
    let jointAvailability = [];
    for(var day = 1; day <= 7; day++) {
        for (let slot = 0; slot < (17 * 2) - 1; slot++) {
            jointAvailability.push({
                day: day,
                index: slot
            });
        }
    }

    for(const userId of selectedUserIds) {
        const matchingAvailabilityEntry = embeddedAvailability.find(item => item.user_id == userId);
        if(matchingAvailabilityEntry) {
            jointAvailability = getIntersection(jointAvailability, matchingAvailabilityEntry.data);
        } else {
            jointAvailability = [];
            break;
        }
    }

    for(const jointlyAvailable of jointAvailability) {
        const element = document.getElementById(`slot-day-${jointlyAvailable.day}-index-${jointlyAvailable.index}`);
        element.classList.add("selected");
    }
}

function clearHighlighting ()
{
    const elements = document.querySelectorAll(`[id^="slot-day-"]`);
    for(const el of elements) {
        el.classList.remove("selected");
    }
}

function getIntersection(arr1, arr2) {
    return arr1.filter(item1 =>
        arr2.find(item2 => item1.day == item2.day && item1.index == item2.index)
    );
}
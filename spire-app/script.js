//function to validate typed address
async function verifyAddress(form) {
    const formData = Object.fromEntries(new FormData(form))
    const xhttp = new XMLHttpRequest();

    //encode form fields into XML
    let xml = `<AddressValidateRequest USERID="724TEST04353"><Revision>1</Revision><Address><Address1>${formData.address1}</Address1><Address2>${formData.address2}</Address2><City>${formData.city}</City><State>${formData.state}</State><Zip5>${formData.zip}</Zip5><Zip4/></Address></AddressValidateRequest>`;

    //set address validation API URL
    const url = 'https://secure.shippingapis.com/ShippingAPI.dll?API=Verify&XML=' + xml;

    //initiate request
    xhttp.open('GET', url, true);

    // runs on every state change
    xhttp.onreadystatechange = (e) => {
        //if request is successfull
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            const xmlDoc = xhttp.responseXML;
            const error = xmlDoc.getElementsByTagName('Error');

            if (error.length) {
                handleFailure(xmlDoc.getElementsByTagName('Description')[0].innerHTML);
                return;
            }

            const typedAddress = {
                address1: formData.address1,
                address2: formData.address2,
                city: formData.city,
                state: formData.state,
                zip: formData.zip
            }

            const standardAddress = {
                address1: xmlDoc.getElementsByTagName("Address1")[0]?.innerHTML,
                address2: xmlDoc.getElementsByTagName("Address2")[0]?.innerHTML,
                city: xmlDoc.getElementsByTagName("City")[0]?.innerHTML,
                state:  xmlDoc.getElementsByTagName("State")[0]?.innerHTML,
                zip: `${xmlDoc.getElementsByTagName("Zip5")[0]?.innerHTML}-${xmlDoc.getElementsByTagName("Zip4")[0]?.innerHTML}`,
            }

            updateDOMAndSaveAddress(typedAddress, standardAddress);
        }
    }
    //prints out error if validation request fails
    xhttp.onerror = (e) => {
        handleFailure('Failed to validate address');
    }

    //send XHR
    xhttp.send();
}

//display failure message in same modal if address validation fails or address is incorrect
function handleFailure(msg) {
    //Add failure message content to DOM
    const modalHeading = document.getElementById('modal-heading');
    const modalBody = document.getElementById('modal-body');

    modalHeading.classList.add('text-danger');
    modalBody.classList.add('ms-2');

    modalBody.innerHTML = msg;
    modalHeading.innerHTML = 'Failure';

    //shows modal
    toggleModal();
}

//updates DOM, displays the modal and saves the address to local storage
function updateDOMAndSaveAddress(typedAddress, standardAddress) {

    //updates DOM
    const selectedAddress1 = document.getElementById('selected-address1');
    const selectedAddress2 = document.getElementById('selected-address2');
    const selectedCity = document.getElementById('selected-city');
    const selectedState = document.getElementById('selected-state');
    const selectedZip = document.getElementById('selected-zip');

    selectedAddress1.innerText = typedAddress.address1 || '';
    selectedAddress2.innerText = typedAddress.address2 || '';
    selectedCity.innerText = typedAddress.city || '';
    selectedState.innerText = typedAddress.state || '';
    selectedZip.innerText = typedAddress.zip || '';

    //add listeners to save to local storage after selecing address
    const typedAddressSelectButton = document.getElementById('origaddradio');
    const standardAddressSelectButton = document.getElementById('stanaddradio');

    typedAddressSelectButton.addEventListener('click', () => {
        selectedAddress1.innerText = typedAddress.address1 || '';
        selectedAddress2.innerText = typedAddress.address2 || '';
        selectedCity.innerText = typedAddress.city || '';
        selectedState.innerText = typedAddress.state || '';
        selectedZip.innerText = typedAddress.zip || '';
    })

    standardAddressSelectButton.addEventListener('click', () => {
        selectedAddress1.innerText = standardAddress.address1 || '';
        selectedAddress2.innerText = standardAddress.address2 || '';
        selectedCity.innerText = standardAddress.city || '';
        selectedState.innerText = standardAddress.state || '';
        selectedZip.innerText = standardAddress.zip || '';
    })

    //show modal
    toggleModal();
}

//Shows/hides modal
function toggleModal() {
    const  verificationModal = bootstrap.Modal.getOrCreateInstance(document.getElementById("address-verification-modal")) 
    if (verificationModal._isShown) {
        verificationModal.hide();
        return;
    }
    verificationModal.show();
}

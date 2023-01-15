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
                state: `${xmlDoc.getElementsByTagName("Zip5")[0]?.innerHTML}-${xmlDoc.getElementsByTagName("Zip4")[0]?.innerHTML}`,
                zip: xmlDoc.getElementsByTagName("State")[0]?.innerHTML,
            }

            updateDOM(typedAddress, standardAddress);
        }
    }
    //prints out error if validation request fails
    xhttp.onerror = (e) => {
        handleFailure('Failed to validate address');
    }

    //send XHR
    xhttp.send();
}

function handleFailure(msg) {
    const modalHeading = document.getElementById('modal-heading');
    const modalBody = document.getElementById('modal-body');

    modalHeading.classList.add('text-danger');
    modalBody.classList.add('ms-2');

    modalBody.innerHTML = msg;
    modalHeading.innerHTML = 'Failure';

    showModal();
}

function updateDOM(typedAddress, standardAddress) {
    document.getElementById('typed-address1').innerText = typedAddress.address1 || '';
    document.getElementById('typed-address2').innerText = typedAddress.address2 || '';
    document.getElementById('typed-city').innerText = typedAddress.city || '';
    document.getElementById('typed-state-zip').innerText = `${typedAddress.state} ${typedAddress.zip}`

    document.getElementById('standard-address1').innerText = standardAddress.address1 || '';
    document.getElementById('standard-address2').innerText = standardAddress.address2 || '';
    document.getElementById('standard-city').innerText = standardAddress.city || '';
    document.getElementById('standard-state-zip').innerText = `${standardAddress.state} ${standardAddress.zip}`

    showModal();
}


function showModal() {
    //show modal for address for selecting address
    let verificationModal = new bootstrap.Modal(
        document.getElementById("address-verification-modal"),
        {}
    );
    verificationModal.show();
}
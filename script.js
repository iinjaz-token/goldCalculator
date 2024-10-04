document.getElementById('goldForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const weight = document.getElementById('weight').value;

    // Show the loading indicator
    document.getElementById('loading').style.display = 'block';

    // Fetch live gold price in SAR using GoldAPI
    fetch('https://www.goldapi.io/api/XAU/SAR', {
        headers: {
            'x-access-token': 'goldapi-ad17ya19m1v27ale-io', // Replace with your GoldAPI key
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.price) {
            const pricePerGramSAR = data.price / 31.1035; // Convert price per ounce to price per gram in SAR
            const pricePerGramBHD = pricePerGramSAR / 10; // Convert SAR to BHD by dividing by 10

            // Calculate prices for 18k, 21k, 22k, and 24k in BHD
            const price18 = pricePerGramBHD * 0.750 * weight;
            const price21 = pricePerGramBHD * 0.875 * weight;
            const price22 = pricePerGramBHD * 0.916 * weight;
            const price24 = pricePerGramBHD * 1 * weight;

            // Update the content in the results section, only if the elements exist
            if (document.getElementById('price18')) {
                document.getElementById('price18').textContent = `سعر عيار 18: ${price18.toFixed(2)} دينار بحريني`;
            }
            if (document.getElementById('price21')) {
                document.getElementById('price21').textContent = `سعر عيار 21: ${price21.toFixed(2)} دينار بحريني`;
            }
            if (document.getElementById('price22')) {
                document.getElementById('price22').textContent = `سعر عيار 22: ${price22.toFixed(2)} دينار بحريني`;
            }
            if (document.getElementById('price24')) {
                document.getElementById('price24').textContent = `سعر عيار 24: ${price24.toFixed(2)} دينار بحريني`;
            }
        } else {
            console.error('Error fetching valid data from the API');
        }
    })
    .catch(error => {
        console.error('Error fetching gold price:', error);
    })
    .finally(() => {
        // Hide the loading indicator once the fetch is complete
        document.getElementById('loading').style.display = 'none';
    });
});

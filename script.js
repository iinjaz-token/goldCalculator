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

            // Update the content in the results section
            document.getElementById('price18').innerHTML = `سعر عيار <span class="gold-text">18</span>: ${price18.toFixed(2)} دينار بحريني`;
            document.getElementById('price21').innerHTML = `سعر عيار <span class="gold-text">21</span>: ${price21.toFixed(2)} دينار بحريني`;
            document.getElementById('price22').innerHTML = `سعر عيار <span class="gold-text">22</span>: ${price22.toFixed(2)} دينار بحريني`;
            document.getElementById('price24').innerHTML = `سعر عيار <span class="gold-text">24</span>: ${price24.toFixed(2)} دينار بحريني`;

            // Show the results div after calculation
            document.getElementById('results').style.display = 'block';
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

const fromAmountElement = document.querySelector('.amount');
const convertedAmountElement = document.querySelector('.convertedAmount');
const fromCurrencyElement = document.querySelector('.fromCurrency');
const toCurrencyElement = document.querySelector('.ToCurrency');
const resultElement = document.querySelector('.result');
const converterContainer = document.querySelector('.converter-container');

const countries = [
    { code: "AED", name: "United Arab Emirates Dirham" },
    { code: "AFN", name: "Afghan Afghani" },
    { code: "ALL", name: "Albanian Lek" },
    { code: "AMD", name: "Armenian Dram" },
    { code: "ANG", name: "Netherlands Antillean Guilder" },
    { code: "AOA", name: "Angolan Kwanza" },
    { code: "ARS", name: "Argentine Peso" },
    { code: "AUD", name: "Australian Dollar" },
    { code: "AWG", name: "Aruban Florin" },
    { code: "AZN", name: "Azerbaijani Manat" },
    { code: "BAM", name: "Bosnia-Herzegovina Convertible Mark" },
    { code: "BBD", name: "Barbadian Dollar" },
    { code: "BDT", name: "Bangladeshi Taka" },
    { code: "BGN", name: "Bulgarian Lev" },
    { code: "BHD", name: "Bahraini Dinar" },
    { code: "BIF", name: "Burundian Franc" },
    { code: "BMD", name: "Bermudian Dollar" },
    { code: "BND", name: "Brunei Dollar" },
    { code: "BOB", name: "Bolivian Boliviano" },
    { code: "BRL", name: "Brazilian Real" },
    { code: "BSD", name: "Bahamian Dollar" },
    { code: "BTN", name: "Bhutanese Ngultrum" },
    { code: "BWP", name: "Botswanan Pula" },
    { code: "BYN", name: "Belarusian Ruble" },
    { code: "BZD", name: "Belize Dollar" },
    { code: "CAD", name: "Canadian Dollar" },
    { code: "CDF", name: "Congolese Franc" },
    { code: "CHF", name: "Swiss Franc" },
    { code: "CLP", name: "Chilean Peso" },
    { code: "CNY", name: "Chinese Yuan" },
    { code: "COP", name: "Colombian Peso" },
    { code: "CRC", name: "Costa Rican Colón" },
    { code: "CUP", name: "Cuban Peso" },
    { code: "CVE", name: "Cape Verdean Escudo" },
    { code: "CZK", name: "Czech Republic Koruna" },
    { code: "DJF", name: "Djiboutian Franc" },
    { code: "DKK", name: "Danish Krone" },
    { code: "DOP", name: "Dominican Peso" },
    { code: "DZD", name: "Algerian Dinar" },
    { code: "EGP", name: "Egyptian Pound" },
    { code: "ERN", name: "Eritrean Nakfa" },
    { code: "ETB", name: "Ethiopian Birr" },
    { code: "EUR", name: "Euro" },
    { code: "FJD", name: "Fijian Dollar" },
    { code: "FKP", name: "Falkland Islands Pound" },
    { code: "FOK", name: "Faroese Króna" },
    { code: "GBP", name: "British Pound Sterling" },
    { code: "GEL", name: "Georgian Lari" },
    { code: "GGP", name: "Guernsey Pound" },
    { code: "GHS", name: "Ghanaian Cedi" },
    { code: "GIP", name: "Gibraltar Pound" },
    { code: "GMD", name: "Gambian Dalasi" },
    { code: "GNF", name: "Guinean Franc" },
    { code: "GTQ", name: "Guatemalan Quetzal" },
    { code: "GYD", name: "Guyanaese Dollar" },
    { code: "HKD", name: "Hong Kong Dollar" },
    { code: "HNL", name: "Honduran Lempira" },
    { code: "HRK", name: "Croatian Kuna" },
    { code: "HTG", name: "Haitian Gourde" },
    { code: "HUF", name: "Hungarian Forint" },
    { code: "IDR", name: "Indonesian Rupiah" },
    { code: "ILS", name: "Israeli New Shekel" },
    { code: "IMP", name: "Manx pound" },
    { code: "INR", name: "Indian Rupee" },
    { code: "IQD", name: "Iraqi Dinar" },
    { code: "IRR", name: "Iranian Rial" },
    { code: "ISK", name: "Icelandic Króna" },
    { code: "JEP", name: "Jersey Pound" },
];

//Showing countries from array to select tag
// country is the local variable name inside the forEach loop
countries.forEach(country =>{
const option1 = document.createElement('option'); // created an element in javascript
const option2 = document.createElement('option');

option1.value = option2.value = country.code;
option1.textContent = option2.textContent = `${country.code} (${country.name})`;

fromCurrencyElement.appendChild(option1);
toCurrencyElement.appendChild(option2);

// Setting Default values of select tag
fromCurrencyElement.value = "USD";
toCurrencyElement.value = "INR";


})


// Creating a function that will give exhange rate using API
// Creating a function that will give exchange rate using API
const getExchangeRate = async () => {
    const amount = parseFloat(fromAmountElement.value);
    const fromCurrency = fromCurrencyElement.value;
    const toCurrency = toCurrencyElement.value;

    resultElement.textContent = "Fetching Exchange rates.......";
    try {
        // Fetching the API
        const response = await fetch(`https://v6.exchangerate-api.com/v6/5ec47f0ca6ef34415400ab0c/latest/${fromCurrency}`);
        const data = await response.json();
        console.log(data);
        const conversionRate = data.conversion_rates[toCurrency];

        console.log(conversionRate);
        if (typeof conversionRate === 'undefined') {
            resultElement.textContent = "Exchange rate is not available for that country";
            // Clearing the value of convertedAmountElement if conversion rate is undefined
            if (convertedAmountElement) {
                convertedAmountElement.value = "";
            } else {
                console.error('convertedAmountElement is null');
            }
        } else {
            const convertedAmount = (amount * conversionRate).toFixed(3);
            // Checking if convertedAmountElement is not null before setting its value
            if (convertedAmountElement) {
                convertedAmountElement.value = convertedAmount;
                resultElement.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
            } else {
                console.error('convertedAmountElement is null');
            }
        }
        
    } catch (error) {
        console.error('Error while fetching exchange rate:', error);
        converterContainer.innerHTML = "<h1>Error while fetching exchange rate</h1>";
    }
}


fromAmountElement.addEventListener('input', getExchangeRate);
fromCurrencyElement.addEventListener('change', getExchangeRate);
toCurrencyElement.addEventListener('change', getExchangeRate);
window.addEventListener('load', getExchangeRate);

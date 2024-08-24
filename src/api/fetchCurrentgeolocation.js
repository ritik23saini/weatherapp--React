const fetchCurrentgeolocation = () => {
    return new Promise((resolve, reject) => {
        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        };

        function success(position) {
            const crd = position.coords;
            resolve({
                latitude: crd.latitude,
                longitude: crd.longitude,
            });
        }

        function error(err) {
            let errorMessage = 'An unknown error occurred.';
            switch (err.code) {
                case err.PERMISSION_DENIED:
                    errorMessage = 'User denied the request for Geolocation.';
                    break;
                case err.POSITION_UNAVAILABLE:
                    errorMessage = 'Location information is unavailable.';
                    break;
                case err.TIMEOUT:
                    errorMessage = 'The request to get user location timed out.';
                    break;
                default:
                    errorMessage = 'An unknown error occurred.';
                    break;
            }
            console.warn(`ERROR(${err.code}): ${errorMessage}`);
            reject(new Error(errorMessage));
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error, options);
        } else {
            reject(new Error('Geolocation is not supported by this browser.'));
        }
    });
};

export default fetchCurrentgeolocation;

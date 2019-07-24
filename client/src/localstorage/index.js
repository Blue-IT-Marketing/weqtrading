import {encrypt,decrypt} from '../encryption';


class myLocalStore {

    constructor() {
        this.date = new Date();
        this.memStoreStateKey = 'p2ploans';
        this.state_keys = [];
        this.use_mem_store = false;
        this.stale_period = 1200000; // equals 5 minutes
        this.mem_store_value = {
            state_key : '',
            state : {}
        };

        this.cipher_seed='';
        this.mem_store = [];
    };

    //functions
    loadTomemStore = async () => {
            let isError = false;
            let doLoadStateKeys = async () => {
                try{
                    this.state_keys = await JSON.parse(localStorage.getItem(this.memStoreStateKey));

                }catch (e) {
                    isError = true
                };

                return !isError;
            };

            let onLoading = async () => {
                let isError = false;
                this.state_keys.forEach(state_key => {
                    try{
                        this.mem_store_value.state = JSON.parse(localStorage.getItem(state_key));
                        this.mem_store_value.state_key = state_key;
                        this.mem_store.push(this.mem_store_value);
                    }catch (e) {
                        console.log('failed to load state');
                        isError = true;
                    }
                });
                return !isError;
            };
            
            return doLoadStateKeys().then(function (value) {
                onLoading().then( (value) => {
                    console.log('state store fully loaded to mem store',value);
                    return value;
                });
            })
    };

    saveMemStore = async () => {

        let onSaving = async () => {
            this.state_keys = [];
            let noError = true;
            this.mem_store.forEach(mem_store_value => {
                try{
                    this.state_keys.push(mem_store_value.state_key);
                    this.setState(mem_store_value.state_key,JSON.stringify(mem_store_value.state)).then(
                        function (state) {
                            console.log('state was saved to localstorage',state);
                            localStorage.setItem(mem_store_value.state_key + '_timestamp', this.date.getTime());
                    }).catch( (err) => {
                        console.log('there where errors saving state',err.message);
                    })

                }catch (e) {
                    console.log('there is an error saving states from mem store to locaStorage');
                    noError = false;
                }
            });

            return noError;
        };

        return onSaving().then(function (value) {
            console.log('done saving to mem store and did we succeed : ',value);
            return value;
        })
    };

    getState = async (seed,stateKey) => {
        // should insert hooks here to switch to mem store or localStorage
        //let key = encrypt(stateKey,seed);

        // if (this.state_keys.findIndex(stateKey) === -1){
        //     this.state_keys.push(stateKey);
        // }
        if ((seed !== undefined) && (seed !== null) && (seed !== '')){
            const serializedState = await decrypt(localStorage.getItem(stateKey), seed);
            return serializedState === null ? undefined : JSON.parse(serializedState);
        }else{
            return undefined
        }
    };

    setState = async (seed,stateKey,state) => {
        // should insert hooks here to switch to mem store or localStorage
        try {
            //let key = encrypt(stateKey,seed);
            if ((seed !== undefined) && (seed !== null) && (seed !== '')){
                const serializedState = await encrypt(JSON.stringify(state), seed);
                await localStorage.setItem(stateKey, serializedState);
                await localStorage.setItem(stateKey + '_timestamp', encrypt(this.date.getTime(), seed));
                return serializedState;
            }else{
                throw new Error('Invalid seed value');
            }

            // if (this.state_keys.findIndex(stateKey) === -1){
            //     this.state_keys.push(stateKey);
            //     this.mem_store_value.state_key = stateKey;
            //     this.mem_store_value.state = state;
            //     this.mem_store.push(this.mem_store_value);
            //     await localStorage.setItem(this.memStoreStateKey,this.state_keys);
            // }

        }catch (e) {
            return undefined;
        }
    };


    // staleItemFound = async (seed,stateKey) => {
    //         let stamp_2 = new Date();
    //         stamp_2 = stamp_2.getTime();
    //
    //
    //         const stamp_1 = await decrypt(localStorage.getItem(stateKey+'_timestamp'),seed);
    //         let diff = parseInt(parseFloat(stamp_2) - parseFloat(stamp_1));
    //
    //         console.log('Here is the diff', diff);
    //         if (diff > this.stale_period){
    //             console.log('Item found',stateKey);
    //             await localStorage.removeItem(stateKey);
    //             await localStorage.removeItem(stateKey+'_timestamp');
    //         }
    //         return true;
    // }

};



export let myStore = new myLocalStore();


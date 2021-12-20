let app = new Vue({
    el: '#app',
    data: {
        friends: [],
        newName: null,
        newDate: null,
        searchKey:'',
        showCreate : true,
        showOne : true,
        showCreateGift : true,
        gifts:[],
        newGift : null,
        newYear : null,
    },
    mounted() {
            if (localStorage.getItem('friends')) {
                try {
                    this.friends = JSON.parse(localStorage.getItem('friends'));
                } catch (e) {
                    localStorage.removeItem('friends');
                }
            }
        },
    computed: {
        
        filteredList(){
            return this.friends.filter((friends) =>{
                return friends.name.toLowerCase().includes(this.searchKey.toLowerCase())
            })
        },
        calculateDays(){
            let today = new Date();
            let birthday = new Date();
        },
    },
        
    

    methods: {
        addFriend() {
            // s'assurer que l'utilisateur a entré quelque chose
            if (!this.newName && !this.newDate) {
                return;
            }

            let id = this.generateId();

            this.friends.push({
                id : id,
                name: this.newName,
                date: this.newDate,
                gifts : [],
            });
            this.newName = '';
            this.newDate = '';
            this.saveFriends();
        },
        removeFriend(x) {
            
            this.friends.splice(x, 1);
            this.saveFriends();
            if (this.friends[x].id != x){
                this.friends[x].id = x;
                
            }
            
            
        },
        saveFriends() {
            const parsed = JSON.stringify(this.friends);
            localStorage.setItem('friends', parsed);
        },
        generateId(){
            let id = this.friends.length;
            return id;
        },
        getUser(who){
            this.name = this.friends[who].name;
            this.date = this.friends[who].date;
            this.id = this.friends[who].id;
            // this.gifts = this.friends[who].gifts
            
        },
        addGift(who){
            if (!this.newYear && !this.newGift) {
                return;
            }
            giftId = this.generateId();

            if(giftId != who){
                giftId = who;
                
            }
            let newGift = {
                id : giftId,
                friendId : who,
                year : this.newYear,
                gift : this.newGift,
            }
            this.gifts.push(newGift);
            
            this.friends[who].gifts.push(newGift);
            
            
            this.newYear = '';
            this.newgift = '';

            
            this.saveFriends();

        }
    }
})
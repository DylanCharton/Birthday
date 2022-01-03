let app = new Vue({
    el: '#app',
    data: {
        friends: [],
        newName: null,
        newDate: null,
        searchKey:'',
        searchGift:'',
        showCreate : true,
        showOne : true,
        showCreateGift : true,
        friendIndex : "",
        newPhoto : "",
        newGift : null,
        newYear : null,
    },
    mounted() {
            if (localStorage.getItem('friends')) {
                try {
                    this.friends = JSON.parse(localStorage.getItem('friends'));
                    this.gifts = JSON.parse(localStorage.getItem('gifts'));
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
        filteredGift(){
            
            return this.friends[this.friendIndex].gifts.filter((giftList) =>{
                return giftList.gift.toLowerCase().includes(this.searchGift.toLowerCase())
            })

            
            
        },
        
    },
        
    methods: {
        addFriend() {
            // s'assurer que l'utilisateur a entré quelque chose
            if (!this.newName && !this.newDate) {
                return;
            }

            let id = this.generateId();
            this.getBaseSixtyFour()
            console.log(this.newPhoto)
            this.friends.push({
                id : id,
                name: this.newName,
                date: this.newDate,
                gifts : [],
                picture : this.newPhoto,
            });
            this.newName = '';
            this.newDate = '';
            this.saveFriends();
        },
        removeFriend(x) {

            this.friends.splice(x, 1);
            for(i = 0; i < this.friends.length; i++){

                this.friends[i].id = i;

            }
            
            
            this.saveFriends();
            
        },
        saveFriends() {
            const parsedFriends = JSON.stringify(this.friends);
            localStorage.setItem('friends', parsedFriends);
            const parsedGifts = JSON.stringify(this.gifts);
            localStorage.setItem('gifts', parsedGifts);
        },
        generateId(){
            let id = this.friends.length;
            return id;
        },
        generateGiftId(x){
            let id = this.friends[x].gifts.length;
            
            return id;
        },
        getUser(who){
            this.friendIndex = who;
            this.name = this.friends[who].name;
            this.date = this.friends[who].date;
            this.id = this.friends[who].id;
            this.gifts = this.friends[who].gifts
            
            
            
        },
        addGift(who){
            if (!this.newYear && !this.newGift) {
                return;
            }
            giftId = this.generateGiftId(who);
            

            let newGift = {
                id : giftId,
                friendId : who,
                year : this.newYear,
                gift : this.newGift,
            }
            
            
            this.friends[who].gifts.push(newGift);
            
            
            this.newYear = '';
            this.newgift = '';

            
            this.saveFriends();

        },
        removeGift(x, index){

            this.friends[x].gifts.splice(index, 1);
            
            for(i = 0; i < this.friends[x].gifts.length; i++){
                
                this.friends[x].gifts[i].id = i;
            }
            
            this.saveFriends();
        },
        getBaseSixtyFour(){
            const file = document.querySelector('input[type="file"]').files[0];
            
            const reader = new FileReader();
            
            reader.onloadend = function(){
                app.newPhoto = reader.result
                console.log(app.newPhoto);

                
            };
            reader.readAsDataURL(file);
            console.log(file)


            
        }
    }
})
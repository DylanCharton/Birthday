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
        removeGift(x){

            this.friends[x].gifts.splice(x, 1);
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
            this.gifts = this.friends[who].gifts;
            this.picture = this.friends[who].picture;
            
            
            
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
        getBaseSixtyFour(){
            const file = document.querySelector('input[type="file"]').files[0];
            
            const reader = new FileReader();
            
            reader.onloadend = function(){
                app.newPhoto = reader.result
                console.log(app.newPhoto);

                
            };
            reader.readAsDataURL(file);
            console.log(file)


            
        },
        getAge(birthdate){
            let date = new Date();
            let year = date.getFullYear();
            let birthyear = new Date(birthdate).getFullYear();
            let age = year - birthyear;
            countdown = this.countdown(birthdate);

            
            // trying to change the age dynamically because it only reacts to the year and not the month or day
            let friendDate = new Date(birthdate)
            let friendMonth = friendDate.getUTCMonth();
            let friendDay = friendDate.getUTCDate();

            let currentMonth = date.getUTCMonth();
            let currentDay = date.getUTCDate();

            if(currentMonth < friendMonth){
                age = age - 1
                
            } else if (currentMonth == friendMonth){

                if(currentDay < friendDay){
                    age = age - 1
                }
            }

            


            return age;
        },
        countdown(birthdate){
            let date = new Date();
            let year = date.getFullYear();
            let friendDate = new Date(birthdate)
            let friendMonth = friendDate.getUTCMonth();
            let friendDay = friendDate.getUTCDate();
            let countdown = new Date(year, friendMonth, friendDay)

            

            if (date.getMonth()+1 > friendMonth && date.getDate()+1 > friendDay){
                countdown.setFullYear(countdown.getFullYear()+1);
            }
            let unixDay = 86400000;
            finalCountdown = Math.ceil((countdown.getTime() - date.getTime()) / (unixDay))

            if(finalCountdown == 365){
                finalCountdown = "Aujourd'hui";
            } else if(finalCountdown == 1){
                finalCountdown = "Demain"
            } else {
                finalCountdown = "dans " + finalCountdown + " jours"
            }

            return finalCountdown;
        },
        removeGift(x, index){

            this.friends[x].gifts.splice(index, 1);
            
            for(i = 0; i < this.friends[x].gifts.length; i++){
                
                this.friends[x].gifts[i].id = i;
            }
            
            this.saveFriends();
        },
        
    }
})
const app = new Vue({
    el: '#app',
    data: {
        friends: [],
        newName: null,
        newDate: null,
        searchKey:''
    },
    computed: {
        mounted() {
            if (localStorage.getItem('friends')) {
                try {
                    this.friends = JSON.parse(localStorage.getItem('friends'));
                } catch (e) {
                    localStorage.removeItem('friends');
                }
            }
        },
        filteredList(){
            return this.friends.filter((friends) =>{
                return friends.name.toLowerCase().includes(this.searchKey.toLowerCase())
            })
        },
    },
    

    methods: {
        addFriend() {
            // s'assurer que l'utilisateur a entré quelque chose
            if (!this.newName && !this.newDate) {
                return;
            }

            this.friends.push({
                name: this.newName,
                date: this.newDate
            });
            this.newName = '';
            this.newDate = '';
            this.saveFriends();
        },
        removeFriend(x) {
            this.friends.splice(x, 1);
            this.saveFriends();
        },
        saveFriends() {
            const parsed = JSON.stringify(this.friends);
            localStorage.setItem('friends', parsed);
        }
    }
})
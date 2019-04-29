<script>
import BackIcon from '../BackIcon/index.vue';
import BlackListIcon from '../BlackListIcon/index.vue';
import SearchIcon from '../SearchIcon/index.vue';
export default {
    name: 'NavBar',
    props: ['title', 'rightBtns', 'leftBtns'],
    components: { BackIcon, SearchIcon },
    data() {
        return {
            components: {
                back: <BackIcon class="nav-btn" on-backClick={this.backClick} />,
                search: <SearchIcon class="nav-btn" on-searchClick={this.searchClick} />,
                blacklist: <BlackListIcon class="nav-btn" on-blacklistClick={this.blacklistClick} />
            }
        };
    },
    render() {
        return (
            <header class="navbar">
                <div class="navbar-left">{this.leftComponents}</div>
                <div class="navbar-title">{this.title ? this.title : this.$slots.title}</div>
                <div class="navbar-right">{this.rightComponents}</div>
            </header>
        );
    },
    computed: {
        leftComponents() {
            return (
                this.leftBtns &&
                this.leftBtns.map((item, index) => {
                    return this.components[item] || this.$slots[item];
                })
            );
        },
        rightComponents() {
            return (
                this.rightBtns &&
                this.rightBtns.map((item, index) => {
                    return this.components[item] || this.$slots[item];
                })
            );
        }
    },
    methods: {
        backClick(e) {
            if (this.$listeners.backClick) {
                this.$emit('backClick', e);
            } else {
                this.$router.go(-1);
            }
        },
        searchClick(e) {
            if (this.$listeners.searchClick) {
                this.$emit('searchClick', e);
            } else {
            }
        },
        blacklistClick(){
            if (this.$listeners.blacklistClick) {
                this.$emit('blacklistClick', e);
            } else {
                this.$router.push('/blacklist')
            }
        }
    }
};
</script>

<style lang="scss">
header.navbar {
    position: relative;
    z-index: 1;
    height: 100px;
    background-color: #fff;
    color: #1e1e1e;
    display: flex;
    align-items: center;
    padding: 0 30px;
    border-bottom: 1px solid #ddd;
    div[class^='navbar-'] {
        height: 100px;
        min-width: 0;
    }
    .navbar-left,
    .navbar-right {
        display: flex;
        align-items: center;
        flex: 1;
        font-size: 32px;
        line-height: 100px;
    }
    .navbar-left {
        justify-content: flex-start;
    }
    .navbar-right {
        justify-content: flex-end;
    }
    .navbar-title {
        display: flex;
        flex: 2;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
        line-height: normal;
        font-size: 32px;
        font-weight: 400;
        .title-wrap {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            line-height: normal;
            font-size: 20px;
            div {
                &:first-child {
                    font-size: 32px;
                }
                font-size: 18px;
            }
        }
    }
    .nav-btn {
        + .nav-btn {
            margin-left: 30px;
        }
    }
}
</style>
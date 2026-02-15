<template>
	<!-- Used: https://get.foundation/building-blocks/blocks/topbar-center-logo.html -->
	<main>
		<div class="top-bar topbar-center-logo" id="topbar-center-logo">
			<div class="top-bar-left">
				<ul class="menu vertical medium-horizontal">
					<li><a :href="apiResponse.navbar.button_left.link" class="button">{{ apiResponse.navbar.button_left.name }}</a></li>
				</ul>
			</div>
			<div class="top-bar-center">
				<span class="navbar-brand">{{ apiResponse.navbar.title }}</span>
			</div>
			<div class="top-bar-right">
				<ul class="menu vertical medium-horizontal">
					<li><a :href="apiResponse.navbar.button_right.link" class="button">{{ apiResponse.navbar.button_right.name }}</a></li>
				</ul>
			</div>
		</div>
	</main>
</template>

<script>
import { fetchConfigData } from "../../plugins/api";

export default {
	data() {
		return {
			apiResponse: '',
		};
	},
	async created() {
		this.apiResponse = await fetchConfigData();
	},
};
</script>


<style>
.topbar-center-logo {
	background: #2c3840;
}

.topbar-center-logo .menu {
	background: #2c3840;
}

.topbar-center-logo .menu a {
	color: #fefefe;
}

.topbar-center-logo .top-bar-center {
	-webkit-flex: 1 0 auto;
	-ms-flex: 1 0 auto;
	flex: 1 0 auto;
}

.top-bar-center {
	color: #fefefe;
	font-weight: 700;
	text-transform: uppercase;
	word-spacing: 1px; letter-spacing:2px;
}

@media screen and (max-width: 39.9375em) {
	.topbar-center-logo .top-bar-center {
		display: none;
	}
}
</style>

<main>
    <LayoutGrid style="vertical-align: middle">
        <Cell spanDevices={{desktop: 6, tablet: 4, phone: 12}}>
            <p>test</p>
        </Cell>
        <Cell spanDevices={{desktop: 6, tablet: 4, phone: 12}}>
            <Textfield bind:value={email} label="Email" variant="filled">
                <HelperText slot="helper">sample@mail.com</HelperText>
            </Textfield>
            <Textfield bind:value={username} label="Username" variant="filled">
                <HelperText slot="helper">Be crative : )</HelperText>
            </Textfield>
            <Textfield bind:value={password} label="Password" variant="filled">
                <HelperText slot="helper">Your password has to be at least 8 Characters long</HelperText>
            </Textfield>
            <Textfield bind:value={password} label="Repeat Password" variant="filled">
                <HelperText slot="helper">Repeat the password you stated above</HelperText>
            </Textfield>
        </Cell>
    </LayoutGrid>
    
</main>

<script lang="ts">
    import Textfield from '@smui/textfield';
    import HelperText from '@smui/textfield/helper-text';
    import LayoutGrid, { Cell } from '@smui/layout-grid';

    let email = ' ';
    let username = ' ';
    let password = ' ';
</script>

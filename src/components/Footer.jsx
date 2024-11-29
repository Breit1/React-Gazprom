import { Card } from '@consta/uikit/Card';
import { Text } from '@consta/uikit/TextDeprecated';

const Footer = () => {
    return (
        <>
            <Card verticalSpace={"xs"} horizontalSpace={'xs'} shadow="false" style={{width: '100%', height: '100%', background: '#f1f1f1' }}>
                <Text>©️My company</Text>
            </Card>
        </>
    )
}
export default Footer;
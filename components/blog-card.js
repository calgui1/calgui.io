import { Box, Text, useColorModeValue } from "@chakra-ui/react"
import NextLink from 'next/link'

export const BlogPostCard = ({ id, title, gradient }) => {
  return (
  <NextLink href={`/posts/${id}`} passHref scroll={false}>
    <Box borderRadius={15} bgGradient={gradient} p={1} maxW="100%" height="250px">
      <Box borderRadius={12} bg={useColorModeValue("#ffffff","#111111")} height="100%" p={6}>
        <Text variant="blog-title" as="b" align="justify">
          {title}
        </Text>
      </Box>
    </Box>
  </NextLink>
  )
}
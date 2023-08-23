#!/usr/bin/python3
""" BasicCache module
"""
BaseCaching = __import__('base_caching').BaseCaching


class BasicCache(BaseCaching):
    """
    Class inherits from BaseCaching and is a chaning system
    """
    def __init__(self):
        """
        Lets Initialize the class using the parent
        class __init__ method
        """
        BaseCaching.__init__(self)

    def put(self, key, item):
        """
        assign to the dictionary self.cache_data
        the item value for the key key.
        Args:
            Key
            Item
        """
        if key is None or item is None:
            pass
        else:
            self.cache_data[key] = item

    def get(self, key):
        """
        return the value in self.cache_data
        linked to key.
        """
        if key is not None and key in self.cache_data.keys():
            return self.cache_data[key]
        return None

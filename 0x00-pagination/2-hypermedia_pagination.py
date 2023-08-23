#!/usr/bin/env python3
"""
Module
"""
import csv
import math
from typing import Tuple, List


index_range = __import__('0-simple_helper_function').index_range


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """
        Args:
            page (int): required page number. must be a positive integer
            page_size (int): number of records per page. must be
            a positive integer
        Return:
            list of lists containing required data from the dataset
        """
        assert type(page) is int and page > 0
        assert type(page_size) is int and page_size > 0

        dataset = self.dataset()
        data_length = len(dataset)
        try:
            index = index_range(page, page_size)
            return dataset[index[0]:index[1]]
        except IndexError:
            return []

    def get_hyper(self, page: int = 1, page_size: int = 10) -> dict:
        """
        Args:
            page (int): required page number. must be a positive integer
            page_size (int): number of records per page. must be
            a positive integer
        Return:
            list of lists containing required data from the dataset
        """
        all_pages = len(self.dataset()) // page_size + 1
        data = self.get_page(page, page_size)
        return_data = {
            "page": page,
            "page_size": page_size if page_size <= len(data) else len(data),
            "total_pages": all_pages,
            "data": data,
            "prev_page": page - 1 if page > 1 else None,
            "next_page": page + 1 if page + 1 <= all_pages else None
        }
        return return_data
